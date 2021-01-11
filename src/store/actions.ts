// import * as types from './types';
import { action } from 'typesafe-actions';
// import axios from 'axios';

import * as actionTypes from './actionTypes';
// import { Dispatch } from 'react';
// import { ThunkAction } from 'redux-thunk';
// import axios from 'axios';

export const fetchTasks = (msg: string) => action(actionTypes.FETCH_TASKS, msg);
export const addTask = (taskName: string, isEditing: boolean) => action(actionTypes.ADD_TASK, { taskName, isEditing });
export const editTask = (taskName: string, taskId: number) => action(actionTypes.EDIT_TASK, { taskName, taskId });
export const removeTask = (taskName: string, taskId: number) => action(actionTypes.REMOVE_TASK, { taskName, taskId });

// Async Redux-Thunk action
// export const asyncThinkAction: ActionCreator<
//   types.AppThunk> = () => {
//     return async (dispatch: Dispatch<types.RootAction>): Promise<types.RootAction> => {
//       try {
//         const text = await axio();
//         return dispatch({
//           type: actionTypes.FETCH_TASKS,
//           text
//         });
//       } catch (e) { }
//     };
//   };

// function axio() {
//   axios.get('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => {console.log(response.data)});
// }