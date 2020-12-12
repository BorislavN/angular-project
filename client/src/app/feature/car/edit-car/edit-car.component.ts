import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ICar } from 'src/app/shared/interface/car-details';
import { picturesValidator, powertrainValidator, transmissionValidator } from 'src/app/shared/validator/validator';
import { CarService } from '../car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {
  @Input('currentCar') currentCar: ICar;
  @Output() onHideEditForm = new EventEmitter<boolean>();
  @Output() onEdited = new EventEmitter<ICar>();

  currentYear: number;
  editFormLoading: boolean;
  form: FormGroup;
  errors: String[];
  files: File[];

  constructor(private carService: CarService, private router: Router, private titleService: Title, private builder: FormBuilder) {
    this.errors = [];
    this.files = [];
    this.currentYear = new Date().getFullYear();
    this.editFormLoading = false;
  };

  ngOnInit(): void {
    this.titleService.setTitle("Edit Car");

    this.form = this.builder.group({
      make: [this.currentCar.make, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      model: [this.currentCar.model, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      year: [this.currentCar.year, [Validators.required, Validators.min(1910), Validators.max(this.currentYear)]],
      miles: [this.currentCar.miles, [Validators.required, Validators.min(0), Validators.max(500000)]],
      powertrain: [this.currentCar.powertrain, [Validators.required, powertrainValidator]],
      transmission: [this.currentCar.transmission, [Validators.required, transmissionValidator]],
      pictures: ["", [picturesValidator(0)]],
      maxSize: [0, [Validators.max(6000000)]]
    });
  };

  private sendData(data: ICar) {
    this.onEdited.emit(data);
  };

  fileHandler(data: FileList): void {
    this.files = Array.from(data);
    const total = this.files.map(f => f.size).reduce((a, b) => a + b, 0);

    this.form.get("maxSize").setValue(total);
    this.form.get("maxSize").markAsTouched();

    this.form.get("pictures").setValue(this.files.map(e => e.name).join(";"));
    this.form.get("pictures").markAsTouched();
  };

  submitFormHandler(): void {
    this.editFormLoading = true;
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
    this.carService.editCar(this.currentCar._id, formData).subscribe({
      next: (result) => {
        this.editFormLoading = false;
        this.sendData(result);
      },
      error: (err) => {
        let messages = err.error?.errors || [];
        this.editFormLoading = false;

        if (messages.length === 0) {
          this.router.navigate(['/error'], { queryParams: { error: err.error.message } })
        }

        Array.from(messages).forEach((el: any) => {
          this.errors.push(el.msg);
        });
      }
    });
  };

  toggleForm(): void {
    this.onHideEditForm.emit(true);
  };
};