import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ITask, TaskComponent } from '@lib';
import { TTaskStatus } from '../../../../../lib/types';

@Component({
  selector: 'ineo-dashboard-column',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './dashboard-column.component.html',
  styleUrl: './dashboard-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardColumnComponent {
  public tasks = input<ITask[]>([]);
  public status = input.required<TTaskStatus>();
  public edit = output<ITask>();
  public delete = output<string>();
}
