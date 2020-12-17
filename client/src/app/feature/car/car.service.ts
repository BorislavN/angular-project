import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICarCard } from 'src/app/shared/interface/car-card';
import { ICar } from 'src/app/shared/interface/car-details';
import { IResponseMessage } from 'src/app/shared/interface/message';
import { picturesValidator, powertrainValidator, transmissionValidator } from 'src/app/shared/validator/validator';

const defaultValue: ICar = {
    make: "",
    model: "",
    year: undefined,
    miles: undefined,
    powertrain: "",
    transmission: "",
    _id: "",
    pictures: [{ url: "" }],
    forSale: false,
    ownerId: ""
};

@Injectable()
export class CarService {
    constructor(private http: HttpClient, private builder: FormBuilder) { }

    addCar(data: FormData): Observable<IResponseMessage> {
        return this.http.post<IResponseMessage>(`/users/collection`, data);
    }

    getMyCollection(): Observable<ICarCard[]> {
        return this.http.get<ICarCard[]>(`/users/collection`);
    }

    getCar(id: String): Observable<ICar> {
        return this.http.get<ICar>(`/users/collection/${id}`);
    }

    sellCar(data: { carId: String, price: Number, description: String }): Observable<IResponseMessage> {
        return this.http.post<IResponseMessage>(`/offers`, data);
    }

    deleteCar(carId: String): Observable<IResponseMessage> {
        return this.http.delete<IResponseMessage>(`/users/collection/${carId}`);
    }

    editCar(id: String, data: FormData): Observable<ICar> {
        return this.http.put<ICar>(`/users/collection/${id}`, data);
    }

    getForm(type = "add", data: ICar | any = defaultValue): FormGroup {
        const currentYear = new Date().getFullYear();

        return this.builder.group({
            make: [data.make, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
            model: [data.model, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
            year: [data.year, [Validators.required, Validators.min(1910), Validators.max(currentYear)]],
            miles: [data.miles, [Validators.required, Validators.min(0), Validators.max(500000)]],
            powertrain: [data.powertrain, [Validators.required, powertrainValidator]],
            transmission: [data.transmission, [Validators.required, transmissionValidator]],
            pictures: ["", [picturesValidator(("edit" === type ? 0 : 1))]],
            maxSize: [0, [Validators.max(6000000)]]
        });
    }

    handleFiles(form: FormGroup, data: FileList) {
        const files = Array.from(data);
        const total = files.map(f => f.size).reduce((a, b) => a + b, 0);

        form.get("maxSize").setValue(total);
        form.get("maxSize").markAsTouched();

        form.get("pictures").setValue(files.map(e => e.name).join(";"));
        form.get("pictures").markAsTouched();

        return { files, form };
    };

    mapToFormData(files: File[], form: FormGroup): FormData {
        let formData = new FormData();
        const formValue = form.value;

        for (const key in formValue) {
            if ("pictures" === key) {
                files.forEach((f, i) => {
                    formData.set(`picture${i}`, f);
                });
            } else {
                formData.set(key, formValue[key]);
            }
        }
        return formData;
    }
};