import handlebars from 'handlebars';
import {readFileSync} from 'fs';

const wedeploy = require('wedeploy');
const auth = wedeploy.auth('auth-userroles.wedeploy.io');

/**
 * User Route
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 */
export async function user(req, res, next) {
	const currentUser = res.locals.auth.currentUser;
	auth.currentUser = currentUser;
	const user = await auth.getUser(req.params.userId);
  const source = readFileSync('./pages/user.html').toString();
  const template = handlebars.compile(source);
  console.log('user is', user);
  const html = template({
		title: 'User Info',
		name: user.name,
		email: user.email,
		role: user.supportedScopes[0],
		user,
  });
  res.send(html);
}
