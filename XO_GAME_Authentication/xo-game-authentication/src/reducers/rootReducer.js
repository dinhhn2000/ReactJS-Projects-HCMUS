import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import moveAction from './moveReducers';

const rootReducer = combineReducers({
  authReducer, moveAction
});

export default rootReducer;