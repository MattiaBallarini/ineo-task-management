import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  DatepickerComponent,
  formatDate,
  InputComponent,
  ITask,
  SelectComponent,
  TextareaComponent,
} from '@lib';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TasksFacade } from '../../app/store';
import { TTaskStatus } from '../types';
import { GetStatusesAsSelectOptionPipe } from '../pipes/get-statuses-as-select-option.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IsLoadingDirective } from '../directives';

@Component({
  selector: 'ineo-task-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    InputComponent,
    DatepickerComponent,
    TextareaComponent,
    SelectComponent,
    GetStatusesAsSelectOptionPipe,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    IsLoadingDirective,
  ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskModalComponent {
  private dialogRef = inject(MatDialogRef<TaskModalComponent>);
  private tasksFacade = inject(TasksFacade);
  protected data = inject<ITask>(MAT_DIALOG_DATA);
  protected today = new Date();
  protected statuses$ = this.tasksFacade.statuses$;
  protected processing$ = this.tasksFacade.processing$;

  protected mode = computed<'Create' | 'Edit'>(() =>
    this.data ? 'Edit' : 'Create'
  );

  protected form = computed(
    () =>
      new FormGroup({
        title: new FormControl<string>(this.data?.title || '', [
          Validators.required,
        ]),
        date: new FormControl<Date | null>(
          this.data?.date ? new Date(this.data.date) : null,
          [Validators.required]
        ),
        status: new FormControl<TTaskStatus>(this.data?.status || 'todo', [
          Validators.required,
        ]),
        description: new FormControl<string>(this.data?.description || '', [
          Validators.required,
        ]),
      })
  );

  submit() {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    const task: ITask = {
      id: this.data?.id,
      title: this.form().value?.title || '',
      date: formatDate(this.form().value.date!),
      description: this.form()?.value?.description || '',
      status: this.form()?.value?.status || '',
    };

    this.data
      ? this.tasksFacade.updateTask(task)
      : this.tasksFacade.createTask(task);
  }

  close() {
    this.dialogRef.close();
  }
}
