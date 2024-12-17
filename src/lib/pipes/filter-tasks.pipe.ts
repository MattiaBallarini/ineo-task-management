import { Pipe, type PipeTransform } from '@angular/core';
import { ISelectOption, ITask } from '@lib';
import { TTaskStatus } from '../types';

@Pipe({
  name: 'filterTasks',
  standalone: true,
})
export class FilterTasksPipe implements PipeTransform {
  transform(
    tasks?: ITask[] | null,
    status?: TTaskStatus | null,
    search?: string | null
  ): ITask[] {
    if (!tasks) return [];

    return tasks.filter((task) => {
      const matchesSearch = search
        ? task.title?.toLowerCase().includes(search.toLowerCase()) ||
          task.description?.toLowerCase().includes(search.toLowerCase())
        : true;

      const matchesStatus = status ? task.status === status : true;

      return matchesSearch && matchesStatus;
    });
  }
}
