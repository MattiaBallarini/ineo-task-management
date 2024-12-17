import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITasksState } from './state';

export const SelectTaskState = createFeatureSelector<ITasksState>('tasks');

export const SelectCurrentPage = createSelector(
  SelectTaskState,
  (state: ITasksState) => state.currentPage
);

export const SelectTasks = createSelector(
  SelectTaskState,
  (state: ITasksState) => state.tasks
);
export const SelectLoading = createSelector(
  SelectTaskState,
  (state: ITasksState) => state.loading
);
export const SelectRemoving = createSelector(
  SelectTaskState,
  (state: ITasksState) => state.removing
);
export const SelectProcessing = createSelector(
  SelectTaskState,
  (state: ITasksState) => state.processing
);
export const SelectStatuses = createSelector(
  SelectTaskState,
  (state: ITasksState) => state.statuses
);
