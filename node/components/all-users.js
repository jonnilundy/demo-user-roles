/**
 * HandleBars list users helper
 * @param  {Auth.<array>} users
 * @return {String} HTML string of user data
 */
export function handlebarsListHelper(users) {
  let userList = '';
  for (const user of users) {
    userList = userList + '<div class="user-item">' +
      '<div class="name">' + user.name + '</div>' +
      '<div class="email">' + user.email + '</div>' +
      '<div class="role">' + user.supportedScopes[0] + '</div>' + '</div>';
  }
  return userList;
}
