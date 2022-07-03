import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';

// Combine all reducers.
const rootReducer = combineReducers({
  weather: weatherReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
