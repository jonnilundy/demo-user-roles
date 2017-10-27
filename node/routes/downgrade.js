import config from '../config';
import wedeploy from 'wedeploy';

const auth = wedeploy.auth(config.authServiceUrl);

/**
 * Downgrade User Scope Route
 * @param  {Request} req 
 * @param  {Response} res
 * @param  {Function} next
 */
export async function downgrade(req, res, next) {
	const currentUser = res.locals.auth.currentUser;
	auth.currentUser = currentUser;
	const user = await auth.getUser(req.params.userId);
	await user.updateUser({supportedScopes: ['free']});
  res.redirect(`/user/${user.id}`);
}
