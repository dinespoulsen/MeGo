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
