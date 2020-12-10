import { IOffer } from './offer-details';

export interface IOffersWithPagination {
    offers: IOffer[];
    maxPages: number;
    currentPage: number;
}