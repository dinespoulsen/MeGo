import {addUser, editUser, editUserEmail, editUserName, fetchData} from "./coreActions.jsx";
import { Map } from 'immutable';

export default function reducer(state = Map(), action){
  switch (action.type) {
    case "ADD_USER":
      return addUser(state, action.user);
    case "EDIT_USER":
      return editUser(state, action.isEditing);
    case "EDIT_USER_EMAIL":
      return editUserEmail(state, action.email);
    case "EDIT_USER_NAME":
      return editUserName(state, action.name);
    case "FETCH_INFO":
      return fetchData(state, action.fetchInfo);
  }
  return state;
};
