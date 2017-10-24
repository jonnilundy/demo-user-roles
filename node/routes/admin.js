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
