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
    this.form = builder.group({
      make: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      model: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      year: [undefined, [Validators.required, Validators.min(1910), Validators.max(this.currentYear)]],
      miles: [undefined, [Validators.required, Validators.min(0), Validators.max(500000)]],
      powertrain: ["", [Validators.required, powertrainValidator]],
      transmission: ["", [Validators.required, transmissionValidator]],
      pictures: ["", [picturesValidator]]
    });

    this.errors = [];
    this.files = [];
    this.currentYear = new Date().getFullYear();
    this.isLoading = false;
  }

  fileHandler(data: FileList): void {
    this.files = Array.from(data);
    this.form.get("pictures").setValue(this.files.map(e => e.name).join(";"));
  };


  ngOnInit(): void {
    this.titleService.setTitle("Add Car");
  }

  submitFormHandler(): void {
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
    //call service
  };
};