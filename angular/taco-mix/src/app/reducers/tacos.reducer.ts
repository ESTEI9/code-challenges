import { Taco } from '../interfaces/taco';

export function TacosReducer(state: Taco[] = [], action:any) {
  switch(action.type) {
    case 'LOAD_TACOS':
    case 'UPDATE_TACO':
    case 'DELETE_TACO':
      return [...action.payload];
    default:
      return state;
  }
}