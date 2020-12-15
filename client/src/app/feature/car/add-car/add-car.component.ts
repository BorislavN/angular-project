import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { picturesValidator, powertrainValidator, transmissionValidator } from 'src/app/shared/validator/validator';
import { CarService } from '../car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})

export class AddCarComponent implements OnInit {
  currentYear: number;
  isLoading: boolean;
  form: FormGroup;
  errors: String[];
  files: File[];

  constructor(private carService: CarService, private router: Router, private titleService: Title, private builder: FormBuilder) {
    this.errors = [];
    this.files = [];
    this.currentYear = new Date().getFullYear();
    this.isLoading = false;

    this.form = this.builder.group({
      make: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      model: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      year: [undefined, [Validators.required, Validators.min(1910), Validators.max(this.currentYear)]],
      miles: [undefined, [Validators.required, Validators.min(0), Validators.max(500000)]],
      powertrain: ["", [Validators.required, powertrainValidator]],
      transmission: ["", [Validators.required, transmissionValidator]],
      pictures: ["", [picturesValidator(1)]],
      maxSize: [0, [Validators.max(6000000)]]
    });
  }

  fileHandler(data: FileList): void {
    this.files = Array.from(data);
    const total = this.files.map(f => f.size).reduce((a, b) => a + b, 0);

    this.form.get("maxSize").setValue(total);
    this.form.get("maxSize").markAsTouched();

    this.form.get("pictures").setValue(this.files.map(e => e.name).join(";"));
    this.form.get("pictures").markAsTouched();
  };


  ngOnInit(): void {
    this.titleService.setTitle("Add Car");
  }

  submitFormHandler(): void {
    this.isLoading = true;
    this.errors = [];

    let formData = new FormData();
    const formValue = this.form.value;

    for (const key in formValue) {
      if ("pictures" === key) {
        this.files.forEach((f, i) => {
          formData.set(`picture${i}`, f);
        });
      } else {
        formData.set(key, formValue[key]);
      }
    }
    this.carService.addCar(formData).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.router.navigateByUrl("/collection");
      },
      error: (err) => {
        let messages = err.error?.errors || [];
        this.isLoading = false;

        if (messages.length === 0) {
          this.router.navigate(['/error'], { queryParams: { error: err.error.message } })
        }

        Array.from(messages).forEach((el: any) => {
          this.errors.push(el.msg);
        });
      }
    });
  };
};