import { Directive, HostBinding, Input, computed } from '@angular/core';

@Directive({
  selector: '[taskStatus]',
  standalone: true,
})
export class TaskStatusDirective {
  @Input() taskStatus: 'todo' | 'done' | 'progress' | '' = 'todo';

  @HostBinding('class.task-todo') get todoClass() {
    return this.taskStatus === 'todo';
  }

  @HostBinding('class.task-done') get doneClass() {
    return this.taskStatus === 'done';
  }

  @HostBinding('class.task-progress') get progressClass() {
    return this.taskStatus === 'progress';
  }
}
