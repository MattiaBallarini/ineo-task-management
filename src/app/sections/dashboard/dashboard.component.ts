import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { TasksFacade } from '../../store';
import { DashboardColumnComponent } from './components/dashboard-column/dashboard-column.component';
import { FilterTasksPipe, ITask, SkeletonComponent } from '@lib';

@Component({
  selector: 'ineo-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardColumnComponent,
    LetDirective,
    FilterTasksPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private tasksFacade = inject(TasksFacade);
  protected statuses$ = this.tasksFacade.statuses$;
  protected tasks$ = this.tasksFacade.tasks$;
  protected loading$ = this.tasksFacade.loading$;

  protected openTaskModal(task?: ITask): void {
    this.tasksFacade.openTaskModal(task);
  }

  protected deleteTask(id: string) {
    this.tasksFacade.deleteTask(id);
  }
}
