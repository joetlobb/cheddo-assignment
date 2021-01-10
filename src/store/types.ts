import { StateType, ActionType } from 'typesafe-actions';

export type RootAction = ActionType<typeof import('./actions')>;
export type RootState = StateType<ReturnType<typeof import('./reducers').default>>;

