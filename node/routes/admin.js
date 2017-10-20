import path from 'path';
import handlebars from 'handlebars';
import {readFileSync} from 'fs';
const wedeploy = require('wedeploy');
const auth = wedeploy.auth('auth-userroles.wedeploy.io');

/**
 * Admin Route
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 */
export async function admin(req, res, next) {
  try {
    handlebars.registerHelper('list', function(users) {
      var userList = '';

      for(const user of users) {
        userList = userList + '<div class="user-item">' +
          '<div class="name">' + user.name + '</div>' +
          '<div class="email">' + user.email + '</div>' +
          '<div class="role">' + user.supportedScopes[0] + '</div>' + '</div>'
      }

      return userList;
    })
    const currentUser = res.locals.auth.currentUser;
    await auth.loadCurrentUser(currentUser.token);
    const allUsers = await auth.getAllUsers();

		const source = readFileSync('./pages/admin.html').toString();
		const template = handlebars.compile(source);
		const html = template({users: allUsers, title: 'Admin Dashboard'});
    res.send(html);
  } catch (error) {
    throw error;
  }
}
