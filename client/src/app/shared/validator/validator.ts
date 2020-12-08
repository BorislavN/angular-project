import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function repeatPasswordValidator(target: AbstractControl): ValidatorFn {
    return function repeatPasswordValidation(current: AbstractControl): ValidationErrors | null {
        const flag = target.value === current.value;

        return flag ? null : { repeatPasswordValidation: true };
    };
};

export function powertrainValidator(type: AbstractControl): ValidationErrors | null {
    return ["Gasoline", "Diesel", "Hybrid", "Electric"].includes(type.value) ? null : { powertrainValidator: true };
};

export function transmissionValidator(type: AbstractControl): ValidationErrors | null {
    return ["Manual", "Automatic"].includes(type.value) ? null : { transmissionValidator: true };
};

export function picturesValidator(pics: AbstractControl): ValidationErrors | null {
    const arr = pics.value.split(";");
    const resultArrSize = arr.filter(e => e.includes(".jpg") || e.includes(".png")).length;

    const isOneToThree = arr.length;
    const isRightExtension = resultArrSize === arr.length;

    return (isOneToThree&&isRightExtension)? null : { picturesValidator: true };
};