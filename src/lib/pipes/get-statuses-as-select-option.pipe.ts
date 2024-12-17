import { Pipe, type PipeTransform } from '@angular/core';
import { ISelectOption, TTaskStatus } from '@lib';

@Pipe({
  name: 'getStatusesAsSelectOption',
  standalone: true,
})
export class GetStatusesAsSelectOptionPipe implements PipeTransform {
  transform(statuses?: TTaskStatus[] | null): ISelectOption[] {
    return statuses ? statuses.map((s) => ({ value: s, label: s })) : [];
  }
}
