import { Dispatch } from 'redux';

import { AppActions } from '../models/actions';

import { FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILED, ADD_TASK, REMOVE_TASK, EDIT_TASK } from './models/actions';

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

const receiveTasks = (tasks: ResData[]): AppActions => {
  return {
    type: FETCH_TASKS_SUCCESS,
    loading: false,
    tasks: tasks,
    error: '',
    logs: []
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
export const editTask = (taskName: string, taskId: number) => ({
    type: EDIT_TASK,
    task: taskName,
    id: taskId
});
export const removeTask = (taskName: string, taskId: number) => ({
    type: REMOVE_TASK,
    task: taskName,
    id: taskId
});