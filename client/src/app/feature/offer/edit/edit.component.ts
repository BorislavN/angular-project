import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IOffer } from 'src/app/shared/interface/offer-details';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  formLoading: boolean;
  form: FormGroup;
  @Input('offer') offer: IOffer;
  @Output() onToggleForm = new EventEmitter<boolean>();
  @Output() onEditResult = new EventEmitter<{ price: number, description: string }>();


  constructor(private offerService: OfferService, private router: Router, private builder: FormBuilder) {
    this.formLoading = false;
  }
  ngOnInit(): void {
    this.form = this.builder.group({
      price: [this.offer.price, [Validators.required, Validators.min(100), Validators.max(5000000)]],
      description: [this.offer.description || "", [Validators.maxLength(750)]]
    });
  }

  toggleForm(): void {
    this.onToggleForm.emit(true);
  }

  private sendEditResult(data: { price: number, description: string }): void {
    this.onEditResult.emit(data);
  }

  submitFormHandler() {
    this.formLoading = true;

    this.offerService.editOffer(this.offer._id, { carId: this.offer.carId._id, ...this.form.value }).subscribe({
      next: (result) => {
        this.formLoading = false;
        this.sendEditResult(result);
        this.toggleForm();
      },
      error: (err) => {
        this.router.navigate(['/error'], { queryParams: { error: (err?.error?.message) } })
      }
    });
  }
}