import {
  TaskActionTypes,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILED,
  ADD_TASK,
  EDIT_TASK,
  REMOVE_TASK
} from './models/actions';

import { Task } from './models/task';

interface TaskState {
  loading: boolean;
  tasks: Task[];
  error: string;
  logs?: [{ method: string, title: string }];
};

const initialState: TaskState = {
  loading: false,
  tasks: [],
  error: '',
};

interface ResData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const taskReducer = (
  state = initialState,
  action: TaskActionTypes
): TaskState => {
  let updatedTasks = [];
  let newLog: any = [];
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true, tasks: [], error: ''
      };
    case FETCH_TASKS_SUCCESS:
      let taskLists: any = action.tasks;
      const newTasks: any = [];
      const logLists: any = [];
      taskLists.map((task: ResData) => newTasks.push({ title: task.title }))
      newTasks.map((newTask: { title: string }) => logLists.push({ method: 'create', title: newTask.title }));
      return {
        ...state,
        loading: false, tasks: newTasks, error: '', logs: logLists
      };
    case FETCH_TASKS_FAILED:
      return {
        ...state,
        loading: false, tasks: [], error: action.error
      };
    case ADD_TASK:
      const newTask: any = action;
      if (state.logs) {
        newLog = [...state.logs];
        newLog.push({ method: 'create', title: newTask.task });
      };
      return {
        ...state,
        tasks: state.tasks.concat({ title: newTask.task }),
        logs: newLog
      };
    case EDIT_TASK:
      const editTask: any = action;
      updatedTasks = [...state.tasks];
      updatedTasks[editTask.id] = { title: editTask.task };
      if (state.logs) {
        newLog = [...state.logs];
        newLog.push({ method: 'update', title: editTask.task });
      };
      return {
        ...state,
        tasks: updatedTasks,
        logs: newLog
      };
    case REMOVE_TASK:
      const removeTask: any = action;
      updatedTasks = [...state.tasks];
      updatedTasks.splice(removeTask.id, 1);
      if (state.logs) {
        newLog = [...state.logs];
        newLog.push({ method: 'delete', title: removeTask.task });
      };
      return {
        ...state,
        tasks: updatedTasks,
        logs: newLog
      };
    default:
      return state;
  };
};