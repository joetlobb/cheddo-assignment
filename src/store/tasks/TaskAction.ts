import { Dispatch } from 'redux';

import { AppActions } from '../models/actions';

import { FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILED, ADD_TASK, REMOVE_TASK, DELETE_TASK } from './models/actions';
import { Task } from './models/task';

interface ResData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const requestTasks = (): AppActions => ({
  type: FETCH_TASKS_REQUEST,
  loading: true,
  tasks: [],
  error: '',
  logs: []
});

const receiveTasks = (tasks: Task[]): AppActions => {
  const logs: string[] = [];
  tasks.map((task: Task) => logs.push('create - ' + task.title))
  return {
    type: FETCH_TASKS_SUCCESS,
    loading: false,
    tasks: tasks,
    error: '',
    logs: logs
  }
};

const invalidTasks = (): AppActions => ({
  type: FETCH_TASKS_FAILED,
  loading: false,
  tasks: [],
  error: 'Something Went Wrong!',
  logs: []
});

export const boundRequestTasks = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(requestTasks());
    return fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${Math.floor(Math.random() * 10) + 1}`)
      .then(res => res.json())
      .then(json => dispatch(receiveTasks(json)))
      .catch(err => dispatch(invalidTasks()));
  };
};

export const addTask = (taskName: string) => ({
    type: ADD_TASK,
    task: taskName
});
export const removeTask = () => ({
    type: REMOVE_TASK,
});
export const deleteTask = () => ({
    type: DELETE_TASK,
});