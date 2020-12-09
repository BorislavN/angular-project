import { ICar } from './car-details';
import { IUser } from './user';

export interface IOffer{
    _id: string;
    authorId:IUser;
    carId:ICar;
    price: Number;
    description: String;
    createdAt: Date;
}