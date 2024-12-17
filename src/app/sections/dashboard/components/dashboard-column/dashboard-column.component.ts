import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ITask, TTaskStatus, SkeletonComponent, TaskComponent } from '@lib';
@Component({
  selector: 'ineo-dashboard-column',
  standalone: true,
  imports: [CommonModule, TaskComponent, SkeletonComponent],
  templateUrl: './dashboard-column.component.html',
  styleUrl: './dashboard-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardColumnComponent {
  public tasks = input<ITask[]>([]);
  public loading = input<boolean | null>(false);
  public status = input.required<TTaskStatus>();
  public edit = output<ITask>();
  public delete = output<string>();
}
