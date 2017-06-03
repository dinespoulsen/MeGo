import { Map, List } from 'immutable';

export const addFlashMessage = (state, message) => {
  let nextState = state.set("message", message);
  return nextState;
};
