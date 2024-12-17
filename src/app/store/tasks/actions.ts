import { createAction, props } from '@ngrx/store';
import { ITask, TINeoPage, TTaskStatus } from '@lib';

const PREFIX = '[Tasks]';

export const SetCurrentPage = createAction(
  `${PREFIX} Set Current Page`,
  props<{ currentPage: TINeoPage }>()
);

export const OpenTaskModal = createAction(
  `${PREFIX} Open Task Modal`,
  props<{ task?: ITask }>()
);

export const GetTaskStatuses = createAction(`${PREFIX} Get Tasks Statuses`);

export const GetTaskStatusesSuccess = createAction(
  `${PREFIX} Get Task Statuses Success`,
  props<{ statuses: TTaskStatus[] }>()
);

export const GetTaskStatusesFailure = createAction(
  `${PREFIX} Get Task Statuses Failure`,
  props<{ errors: any }>()
);

export const GetTasks = createAction(
  `${PREFIX} Get Tasks`,
  props<{ from?: string; to?: string }>()
);

export const GetTasksSuccess = createAction(
  `${PREFIX} Get Tasks Success`,
  props<{ tasks: ITask[] }>()
);

export const GetTasksFailure = createAction(
  `${PREFIX} Get Tasks Failure`,
  props<{ errors: any }>()
);

export const CreateTask = createAction(
  `${PREFIX} Create Task`,
  props<{ task: ITask }>()
);

export const CreateTaskSuccess = createAction(
  `${PREFIX} Create Task Success`,
  props<{ task: ITask }>()
);

export const CreateTaskFailure = createAction(
  `${PREFIX} Create Task Failure`,
  props<{ errors: any }>()
);

export const UpdateTask = createAction(
  `${PREFIX} Update Task`,
  props<{ task: ITask }>()
);

export const UpdateTaskSuccess = createAction(
  `${PREFIX} Update Task Success`,
  props<{ task: ITask }>()
);

export const UpdateTaskFailure = createAction(
  `${PREFIX} Update Task Failure`,
  props<{ errors: any }>()
);

export const DeleteTask = createAction(
  `${PREFIX} Delete Task`,
  props<{ id: string }>()
);

export const DeleteTaskSuccess = createAction(
  `${PREFIX} Delete Task Success`,
  props<{ id: string }>()
);

export const DeleteTaskFailure = createAction(
  `${PREFIX} Delete Task Failure`,
  props<{ errors: any }>()
);
