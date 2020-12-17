import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { IOffer } from "src/app/shared/interface/offer-details";
import { OfferService } from "../service/offer.service";

@Injectable()
export class OfferDetailsResolver implements Resolve<IOffer | String> {

    constructor(private offerService: OfferService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        return this.offerService.getOfferDetails(route.params['id']);
    }
}