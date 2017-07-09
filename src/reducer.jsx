import {addUser, editUser, editUserEmail, editUserName, fetchData, saveAvatarPreview, saveAvatarSignedUrl, isCropping, addMemory, addGoal} from "./coreActions.jsx";
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
    case "AVATAR_PREVIEW":
      return saveAvatarPreview(state, action.avatarUrl);
    case "IS_CROPPING_IMAGE":
      return isCropping(state, action.isCropping);
    case "AVATAR_SIGNED_URL":
      return saveAvatarSignedUrl(state, action.avatarSignedUrl);
    case "ADD_MEMORY":
      return addMemory(state, action.memory);
    case "ADD_GOAL":
      return addGoal(state, action.goal);
  }
  return state;
};
