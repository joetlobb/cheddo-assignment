import * as actionTypes from './actionTypes';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { Task } from './models';

export type TasksAction = ActionType<typeof actions>;

export type TasksState = Readonly<{
  tasks: Task[];
}>;

const initialState: TasksState = {
  tasks: []
};

const reducer = (state = initialState, action: TasksAction) => {
  switch (action.type) {
    case actionTypes.FETCH_TASKS:
      console.log('Yes');
      return {
        ...state,
      };
    default:
      return state;
  };
};

export default reducer;