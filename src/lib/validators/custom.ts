import { AbstractControl, ValidatorFn } from '@angular/forms';

const minDate =
	(min: string | Date): ValidatorFn =>
	(control: AbstractControl) => {
		if (!control.value) return null;
		const inputDate = new Date(control.value);
		const minDate = new Date(min);
		return inputDate >= minDate ? null : { minDate: true };
	};

const maxDate =
	(max: string | Date): ValidatorFn =>
	(control: AbstractControl) => {
		if (!control.value) return null;
		const inputDate = new Date(control.value);
		const maxDate = new Date(max);
		return inputDate <= maxDate ? null : { maxDate: true };
	};

export const CustomValidators = {
	minDate: minDate,
	maxDate: maxDate,
};
