import { Task } from './task';

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';

export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';

interface TaskAsync {
  loading: boolean;
  tasks: Task[];
  error: string;
  logs: string[];
};

interface FetchTasksRequest extends TaskAsync {
  type: typeof FETCH_TASKS_REQUEST;
};
interface FetchTasksSuccess extends TaskAsync {
  type: typeof FETCH_TASKS_SUCCESS;
};
interface FetchTasksFailed extends TaskAsync {
  type: typeof FETCH_TASKS_FAILED;
};
interface AddTask {
  type: typeof ADD_TASK;
};
interface EditTask {
  type: typeof EDIT_TASK;
};
interface RemoveTask {
  type: typeof REMOVE_TASK;
};

export type TaskActionTypes =
  | FetchTasksRequest
  | FetchTasksSuccess
  | FetchTasksFailed
  | AddTask
  | EditTask
  | RemoveTask;