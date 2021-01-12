import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './store/rootStore';
// import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import thunkMiddleware from 'redux-thunk';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import reducers from './store/reducers';

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// let composeEnhancers = null;
// if (process.env.NODE_ENV === 'development') {
//     composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// } else {
//     composeEnhancers = compose;
// };

// const rootReducer = combineReducers({
//   tasks: reducers
// })

// const store = createStore(rootReducer, composeEnhancers(
//   applyMiddleware(thunkMiddleware)
// ));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
