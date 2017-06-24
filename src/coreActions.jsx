import { Map } from 'immutable';

export const addUser = (state, user) => {

  let nextState = state.set("user", user);
  return nextState.set("fetchInfo", Map({isFetchSuccess: ""})).set("avatarUrl", "");
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

export const fetchData = (state, fetchInfo) => {
  let isFetching = fetchInfo.get("isFetching");
  let isFetchSuccess = fetchInfo.get("isFetchSuccess");
  let nextState = state.set("fetchInfo", Map({isFetching: isFetching, isFetchSuccess: isFetchSuccess}));
  return nextState;
};

export const saveAvatarPreview = (state, avatarUrl) => {
  return state.set("avatarUrl", avatarUrl);
};

export const saveAvatarSignedUrl = (state, avatarSignedUrl) => {
  return state.set("avatarSignedUrl", avatarSignedUrl);
};

export const isCropping = (state, isCropping) => {
  return state.set("isCropping", isCropping)
}
