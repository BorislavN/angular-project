export interface ICar {
    _id: String;
    make: String;
    model: String;
    year: number;
    miles: number;
    powertrain: String;
    transmission: String;
    pictures: [{ url: String }];
    forSale: boolean;
    ownerId: String;
}