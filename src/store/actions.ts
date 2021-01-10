import { action } from 'typesafe-actions';

import * as actionTypes from './actionTypes';

export const fetchTasks = () => action(actionTypes.FETCH_TASKS);