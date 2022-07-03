import { Weather } from '../../models/index';
import { Action } from '../actions';
import { ActionType } from '../actionTypes';

const initialState: Weather = new Weather();

const reducer = (state: Weather = initialState, action: Action): Weather => {
  const { type } = action;
  switch (type) {
    case ActionType.GET: {
      const { payload } = action;
      return {
        ...state,
        current: payload.current,
        timezone: payload.timezone,
        daily: payload.daily,
        hourly: payload.hourly,
      };
    }
    default:
      return state;
  }
};

export default reducer;
