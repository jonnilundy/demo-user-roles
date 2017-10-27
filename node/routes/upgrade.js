import config from '../config';
import wedeploy from 'wedeploy';

const auth = wedeploy.auth(config.authServiceUrl).auth(config.masterToken);

/**
 * Upgrade User Scope Route
 * @param  {Request} req 
 * @param  {Response} res
 * @param  {Function} next
 */
export async function upgrade(req, res, next) {
	const currentUser = res.locals.auth.currentUser;
	auth.currentUser = currentUser;
	const user = await auth.getUser(req.params.userId);
	// user.setToken(currentUser.token);
	try {
		await user.updateUser({supportedScopes: ['admin', 'free']});
	} catch (error) {
		console.log('error is', error);
	}
  res.redirect(`/user/${user.id}`);
}
