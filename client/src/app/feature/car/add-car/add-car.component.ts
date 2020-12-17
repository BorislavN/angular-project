import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CarService } from '../car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})

export class AddCarComponent implements OnInit {
  isLoading: boolean;
  form: FormGroup;
  errors: String[];
  files: File[];

  constructor(private carService: CarService, private router: Router, private titleService: Title) {
    this.errors = [];
    this.files = [];
    this.isLoading = false;

    this.form = this.carService.getForm();
  }

  fileHandler(data: FileList): void {
    const { files, form } = this.carService.handleFiles(this.form, data);
    this.files = files;
    this.form = form;
  };

  ngOnInit(): void {
    this.titleService.setTitle("Add Car");
  }

  submitFormHandler(): void {
    this.isLoading = true;
    this.errors = [];

    let formData = this.carService.mapToFormData(this.files, this.form);

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