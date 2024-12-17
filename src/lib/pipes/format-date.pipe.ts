import { Pipe, type PipeTransform } from '@angular/core';
import { formatDate } from '../utils';

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(date: string | Date, format?: string): string {
    return formatDate(date, format);
  }
}
