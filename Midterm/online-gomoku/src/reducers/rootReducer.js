import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import profileReducer from './profile.reducer';
import gameReducer from './game.reducers'

const rootReducer = combineReducers({
  authReducer, profileReducer, gameReducer
});

export default rootReducer;