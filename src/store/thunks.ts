// src/thunks.ts

import * as types from './types';
// import { Action } from 'redux'
import * as actions from './actions'
// import { RootState } from './store'
// import { ThunkAction } from 'redux-thunk'

export const thunkSendMessage = (): types.AppThunk => async dispatch => {
  // const asyncResp = await exampleAPI()
  setTimeout(() => {
    dispatch(actions.fetchTasks('a'));
  },1000);
};

// function exampleAPI() {
//   setTimeout(() => {
//     return Promise.resolve('Async Chat Bot');
//   }, 2000);
//   // return Promise.resolve('Async Chat Bot')
// }