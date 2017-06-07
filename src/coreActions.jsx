import { Map } from 'immutable';

export const addUser = (state, user) => {
  let nextState = state.set("user", user.set("name", ""));
  return nextState.set("editUser", Map());
};

export const editUser = (state, isEditing) => {
  let nextState = state.set("editUser", Map({isEditing: isEditing}));
  return nextState;
};

export const editUserEmail = (state, email) => {
  let user = state.get("user");
  let updatedUser = user.set("email", email);
  return state.set("user", updatedUser);
};

export const editUserName = (state, name) => {
  let user = state.get("user");
  let updatedUser = user.set("name", name)
  return state.set("user", updatedUser);
};
