import { Weather } from '../../models/index';
import { ActionType } from '../actionTypes';

interface GetByLocation {
  type: ActionType.GET;
  payload: Weather;
}

export type Action = GetByLocation;
