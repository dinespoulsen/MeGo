import {addFlashMessage} from "./coreActions.jsx";
import { Map } from 'immutable';

export default function reducer(state = Map(), action){
  switch (action.type) {
    case "ADD_FLASH_MESSAGE":
      return addFlashMessage(state, action.message);
  }
  return state;
};
