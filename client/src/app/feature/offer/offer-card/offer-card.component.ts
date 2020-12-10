import { Component, Input, OnInit } from '@angular/core';
import { IOffer } from 'src/app/shared/interface/offer-details';
import { parseUrl } from 'src/app/shared/util/url.parser';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css']
})
export class OfferCardComponent implements OnInit {

  @Input("offer") offer: IOffer;
  picUrl: String;

  constructor() { }


  ngOnInit(): void {
    this.picUrl = parseUrl(this.offer.carId.pictures[0]);
  }
}
