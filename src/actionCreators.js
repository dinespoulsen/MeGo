export function addUser(user) {
  return {
    type: 'ADD_USER',
    user: user
  };
}

export function editUser(isEditing) {
  return {
    type: 'EDIT_USER',
    isEditing: isEditing
  };
}

export function editUserEmail(email) {
  return {
    type: 'EDIT_USER_EMAIL',
    email: email
  };
}

export function editUserName(name) {
  return {
    type: 'EDIT_USER_NAME',
    name: name
  };
}

export function fetchData(fetchInfo) {
  return {
    type: 'FETCH_INFO',
    fetchInfo: fetchInfo
  };
}

export function saveAvatarPreview(avatarUrl) {
  return {
    type: 'AVATAR_PREVIEW',
    avatarUrl: avatarUrl
  };
}

export function saveAvatarSignedUrl(avatarSignedUrl) {
  return {
    type: 'AVATAR_SIGNED_URL',
    avatarSignedUrl: avatarSignedUrl
  };
}

export function isCroppingImage(isCropping) {
  return {
    type: 'IS_CROPPING_IMAGE',
    isCropping: isCropping
  };
}

export function addMemory(memory){
  return {
    type: "ADD_MEMORY",
    memory: memory
  }
}
