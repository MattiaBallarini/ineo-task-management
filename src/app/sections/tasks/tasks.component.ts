import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { TasksFacade } from '../../store';
import { LetDirective } from '@ngrx/component';
import {
  FilterTasksPipe,
  GetStatusesAsSelectOptionPipe,
  InputComponent,
  ITask,
  SelectComponent,
  SkeletonComponent,
  TaskComponent,
  TTaskStatus,
} from '@lib';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ineo-tasks',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    LetDirective,
    InputComponent,
    SelectComponent,
    ReactiveFormsModule,
    MatButtonModule,
    FilterTasksPipe,
    GetStatusesAsSelectOptionPipe,
    SkeletonComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  private tasksFacade = inject(TasksFacade);
  protected tasks$ = this.tasksFacade.tasks$;
  protected statuses$ = this.tasksFacade.statuses$;
  protected loading$ = this.tasksFacade.loading$;
  protected removing$ = this.tasksFacade.removing$;
  protected searchForm = new FormControl<string>('');
  protected statusForm = new FormControl<TTaskStatus>('');
  protected search = signal<string | null>(null);
  protected status = signal<TTaskStatus | null>(null);

  constructor() {
    this.searchForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => this.search.set(value));

    this.statusForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => this.status.set(value));
  }

  protected openTaskModal(task?: ITask): void {
    this.tasksFacade.openTaskModal(task);
  }

  protected deleteTask(id: string) {
    this.tasksFacade.deleteTask(id);
  }
}
