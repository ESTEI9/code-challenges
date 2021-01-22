import { ActionReducerMap } from '@ngrx/store';
import { Taco } from '../interfaces/taco';
import * as tacosReducer from '../reducers/tacos.reducer';

export interface AppState {
  readonly tacos: Taco[];
}

export const reducers: ActionReducerMap<AppState> = {
  tacos: tacosReducer.TacosReducer
};
