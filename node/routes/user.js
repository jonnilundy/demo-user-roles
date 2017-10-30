import config from '../config';
import handlebars from 'handlebars';
import {readFileSync} from 'fs';
import wedeploy from 'wedeploy';

const auth = wedeploy.auth(config.authServiceUrl);

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
  const html = template({
		title: 'User Info',
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.supportedScopes[0],
		user,
  });
  res.send(html);
}
