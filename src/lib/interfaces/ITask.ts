import { TTaskStatus } from '../types';

export interface ITask {
  id?: string;
  title: string;
  date: string;
  description: string;
  status: TTaskStatus;
}
