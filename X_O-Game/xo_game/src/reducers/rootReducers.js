import {combineReducers} from 'redux';
import moveAction from './moveReducers';

const rootReducer = combineReducers ({
  moveAction,
});

export default rootReducer;
