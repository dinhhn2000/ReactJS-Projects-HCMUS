import {combineReducers} from 'redux';
import gameReducer from './game.reducers'

const rootReducer = combineReducers ({
  gameReducer
});

export default rootReducer;
