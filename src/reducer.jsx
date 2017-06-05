import {addUser} from "./coreActions.jsx";
import { Map } from 'immutable';

export default function reducer(state = Map(), action){
  switch (action.type) {
    case "ADD_USER":
      return addUser(state, action.user);
  }
  return state;
};
