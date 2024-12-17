import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { INITIAL_TASKS_STATE, ITasksState } from './state';

export const tasksReducer = createReducer<ITasksState>(
  INITIAL_TASKS_STATE,
  on(
    actions.SetCurrentPage,
    (state, { currentPage }): ITasksState => ({
      ...state,
      currentPage,
    })
  ),
  on(
    actions.GetTasks,
    actions.GetTaskStatuses,
    (state): ITasksState => ({
      ...state,
      loading: true,
      errors: undefined,
    })
  ),
  on(
    actions.CreateTask,
    actions.DeleteTask,
    actions.UpdateTask,
    (state): ITasksState => ({
      ...state,
      processing: true,
    })
  ),
  on(
    actions.GetTasksSuccess,
    (state, { tasks }): ITasksState => ({
      ...state,
      tasks,
      loading: false,
      errors: undefined,
    })
  ),
  on(
    actions.GetTasksFailure,
    actions.GetTaskStatusesFailure,
    actions.CreateTaskFailure,
    actions.UpdateTaskFailure,
    actions.DeleteTaskFailure,
    (state, { errors }): ITasksState => ({
      ...state,
      loading: false,
      processing: false,
      removing: undefined,
      errors,
    })
  ),
  on(
    actions.GetTaskStatusesSuccess,
    (state, { statuses }): ITasksState => ({
      ...state,
      loading: false,
      statuses,
    })
  ),
  on(
    actions.CreateTaskSuccess,
    actions.UpdateTaskSuccess,
    (state): ITasksState => ({
      ...state,
      processing: false,
      errors: undefined,
    })
  ),
  on(
    actions.DeleteTask,
    (state, { id }): ITasksState => ({
      ...state,
      removing: id,
    })
  ),
  on(
    actions.DeleteTaskSuccess,
    (state, { id }): ITasksState => ({
      ...state,
      tasks: state.tasks.filter((t) => t.id !== id),
      removing: undefined,
    })
  )
);
