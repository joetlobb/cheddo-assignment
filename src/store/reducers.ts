import * as actionTypes from './actionTypes';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { Task } from './models';

export type TasksAction = ActionType<typeof actions>;

export type TasksState = Readonly<{
  tasks: Task[];
  logs: string[];
}>;

const initialState: TasksState = {
  tasks: [
    { title: 'Coding' },
  ],
  logs: ['Coding - created']
};

const reducer = (state = initialState, action: TasksAction) => {
  switch (action.type) {

    case actionTypes.FETCH_TASKS:
      console.log(action.payload);
      return {
        ...state,
      };
    case actionTypes.ADD_TASK:
      const newTask = { title: action.payload.taskName }
      return {
        ...state,
        tasks: state.tasks.concat(newTask),
        logs: state.logs.concat(action.payload.taskName + ' - created')
      };
    case actionTypes.EDIT_TASK:

      // const editTask = { title: action.payload.taskName }
      // const curTasks = [...state.tasks];
      // curTasks[action.payload.taskId] = editTask;
      return {
        ...state,
        // tasks: curTasks,
        logs: state.logs.concat(action.payload.taskName + ' - updated')
      };
    case actionTypes.REMOVE_TASK:
      if (action.payload.taskName === '') return state;
      return {
        ...state,
        // tasks: state.tasks.filter((_, id) => id !== action.payload.taskId),
        logs: state.logs.concat(action.payload.taskName + ' - deleted')
      };
    default:
      return state;
  };
};

export default reducer;