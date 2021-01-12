import {
  TaskActionTypes,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILED,
  ADD_TASK
} from './models/actions';

import { Task } from './models/task';

interface TaskState {
  loading: boolean;
  tasks: Task[];
  error: string;
  logs: string[];
};

const initialState: TaskState = {
  loading: false,
  tasks: [],
  error: '',
  logs: []
};

export const taskReducer = (
  state = initialState,
  action: TaskActionTypes
): TaskState => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true, tasks: [], error: '', logs: []
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false, tasks: action.tasks, error: '', logs: action.logs
      };
    case FETCH_TASKS_FAILED:
      return {
        ...state,
        loading: false, tasks: [], error: action.error, logs: []
      };
    case ADD_TASK:
      console.log(state.tasks);
      let a: any = {};
      a = action;
      console.log(a.task);
      return {
        ...state,
        tasks: state.tasks.concat({
          userId: 1,
          id: 1,
          title: a.task,
          completed: false})
      }
    default:
      return state;
  };
};