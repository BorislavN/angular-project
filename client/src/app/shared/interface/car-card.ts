export interface ICarCard {
    _id: String;
    make: String;
    model: String;
    forSale: boolean;
    pictures: [{ url: String }];
}