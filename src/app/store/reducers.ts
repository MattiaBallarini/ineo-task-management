import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { ITasksState } from './tasks/state';
import { tasksReducer as tasks } from './tasks/reducers';

export interface State {
  tasks: ITasksState;
}

export const reducers: ActionReducerMap<State> = {
  tasks,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
