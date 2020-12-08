import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function repeatPasswordValidator(target: AbstractControl): ValidatorFn {
    return function repeatPasswordValidation(current: AbstractControl): ValidationErrors | null {
        const flag = target.value === current.value;

        return flag ? null : { repeatPasswordValidation: true };
    };
};