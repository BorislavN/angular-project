import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ICar } from 'src/app/shared/interface/car-details';
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

  editFormLoading: boolean;
  form: FormGroup;
  errors: String[];
  files: File[];

  constructor(private carService: CarService, private router: Router, private titleService: Title) {
    this.errors = [];
    this.files = [];
    this.editFormLoading = false;
  };

  ngOnInit(): void {
    this.titleService.setTitle("Edit Car");
    this.form = this.carService.getForm("edit", this.currentCar);
  };

  private sendData(data: ICar) {
    this.onEdited.emit(data);
  };

  fileHandler(data: FileList): void {
    const { files, form } = this.carService.handleFiles(this.form, data);
    this.files = files;
    this.form = form;
  };


  submitFormHandler(): void {
    this.editFormLoading = true;
    this.errors = [];

    let formData = this.carService.mapToFormData(this.files, this.form);

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