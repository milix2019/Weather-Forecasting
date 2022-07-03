import axios from 'axios';
import { ActionType } from '../actionTypes';
import { Dispatch } from 'redux';
import { Action } from '../actions';

// to move in config file
const WEATHER_API_KEY = '9120af6f4ec18bbc5fa39cc29198958c';

export const getWeatherByLocation = (lat: number, lon: number, unit?: string) => {
  return (dispatch: Dispatch<Action>) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${WEATHER_API_KEY}`
      )
      .then((res) => {
        const { data } = res;
        dispatch({
          type: ActionType.GET,
          payload: data,
        });
      })
      .catch((err) => console.log(err));
  };
};
