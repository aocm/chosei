export function updateUserData(state, userData) {
  state.userId = userData.id;
  state.userName = userData.name;
}
