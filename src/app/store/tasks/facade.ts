import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from './selectors';
import * as actions from './actions';
import { ITask } from '@lib';

@Injectable({
  providedIn: 'root',
})
export class TasksFacade {
  private store = inject(Store);

  currentPage$ = this.store.select(selectors.SelectCurrentPage);
  loading$ = this.store.select(selectors.SelectLoading);
  removing$ = this.store.select(selectors.SelectRemoving);
  processing$ = this.store.select(selectors.SelectProcessing);
  tasks$ = this.store.select(selectors.SelectTasks);
  statuses$ = this.store.select(selectors.SelectStatuses);

  openTaskModal = (task?: ITask) => {
    this.store.dispatch(actions.OpenTaskModal({ task }));
  };

  createTask = (task: ITask) => {
    this.store.dispatch(actions.CreateTask({ task }));
  };

  updateTask = (task: ITask) => {
    this.store.dispatch(actions.UpdateTask({ task }));
  };

  deleteTask = (id: string) => {
    this.store.dispatch(actions.DeleteTask({ id }));
  };
}
