import { ITask, TINeoPage, TTaskStatus } from '@lib';

export interface ITasksState {
  tasks: ITask[];
  loading: boolean;
  removing?: string;
  processing: boolean;
  errors: any;
  statuses?: TTaskStatus[];
  currentPage: TINeoPage;
}
export const INITIAL_TASKS_STATE: ITasksState = {
  tasks: [],
  loading: false,
  processing: false,
  removing: undefined,
  errors: undefined,
  statuses: undefined,
  currentPage: '',
};
