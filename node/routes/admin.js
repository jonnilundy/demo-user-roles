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
		const source = readFileSync('./pages/admin.html').toString();
		const template = handlebars.compile(source);
		const html = template({title: 'Welcome'});

		const currentUser = res.locals.auth.currentUser;
		await auth.loadCurrentUser(currentUser.token);
    const allUsers = await auth.getAllUsers();
    res.send(allUsers);
  } catch (error) {
    throw error;
  }
}
