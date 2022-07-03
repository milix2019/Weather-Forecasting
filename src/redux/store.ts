import { configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { Action } from './actions/index';
import rootReducer, { State } from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      thunk as ThunkMiddleware<State, Action, unknown>
    ),
});

export { store };
