import handlebars from 'handlebars';
import {readFile} from 'fs';
import {promisify} from 'util';
const wedeploy = require('wedeploy');
const auth = wedeploy.auth('auth-userroles.wedeploy.io');
const readFileAsync = promisify(readFile);

/**
 * Admin Route
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 */
export async function admin(req, res, next) {
  try {
    const currentUser = res.locals.auth.currentUser;
    auth.currentUser = currentUser;
    const [allUsers, source] = await Promise.all([
      auth.getAllUsers(),
      readFileAsync('./pages/admin.html'),
    ]);
    const allUsersSorted = allUsers.sort(
			(a, b) => a.supportedScopes[0].localeCompare(b.supportedScopes[0])
    );
		const template = handlebars.compile(source.toString());
		const html = template({users: allUsersSorted, title: 'Admin Dashboard'});
    res.send(html);
  } catch (error) {
    throw error;
  }
}

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
