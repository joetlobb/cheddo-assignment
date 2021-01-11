import { ThunkAction } from 'redux-thunk';
import { StateType, ActionType } from 'typesafe-actions';

export type RootAction = ActionType<typeof import('./actions')>;
export type RootState = StateType<ReturnType<typeof import('./reducers').default>>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  RootAction
>;