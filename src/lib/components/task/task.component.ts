import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BadgeComponent, FormatDatePipe, ITask } from '@lib';
import { IsLoadingDirective, TaskStatusDirective } from '../../directives';

@Component({
  selector: 'ineo-task',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    FormatDatePipe,
    TaskStatusDirective,
    BadgeComponent,
    IsLoadingDirective,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  public task = input.required<ITask>();
  public removing = input<boolean>(false);
  public edit = output<ITask>();
  public delete = output<string>();
}
