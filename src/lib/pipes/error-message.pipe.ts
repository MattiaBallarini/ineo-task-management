import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorMessage',
  standalone: true,
})
export class ErrorMessagePipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string | null {
    if (!errors) return null;

    if (errors['required']) return 'Field is required';

    return null;
  }
}
