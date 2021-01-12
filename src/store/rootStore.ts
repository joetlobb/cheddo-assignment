import { createStore, combineReducers, applyMiddleware, compose } from
  'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
// import { createLogger } from 'redux-logger';

import { taskReducer } from './tasks/TaskReducer';
import { AppActions } from './models/actions';

// const logger = createLogger();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
};

let composeEnhancers = null;
if (process.env.NODE_ENV === 'development') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
    composeEnhancers = compose;
};

export const rootReducer = combineReducers({ taskReducer });

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore<AppState, AppActions, {}, {}>(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>, 
    // logger
    ))
);