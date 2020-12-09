import { ICar } from './car-details';

export interface IOfferCard {
    _id: string;
    authorId: String;
    carId: ICar;
    price: Number;
    description: String;
    createdAt: Date;
};