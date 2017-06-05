export const addUser = (state, user) => {
  let nextState = state.set("user", user);
  return nextState;
};
