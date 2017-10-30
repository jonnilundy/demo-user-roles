import config from '../config';
import wedeploy from 'wedeploy';

const auth = wedeploy.auth(config.authServiceUrl).auth(config.masterToken);

/**
 * Upgrade User Scope Route
 * @param  {Request} req 
 * @param  {Response} res
 * @param  {Function} next
 */
export async function update(req, res, next) {
	const name = req.body.name;
	const email = req.body.email;
	const role = req.body.role;
	const userId = req.params.userId;
	const supportedScopes = role === 'admin' ? ['admin', 'free'] : ['free'];
	const data = {name, email, supportedScopes};

	await auth.updateUser(userId, data);
  res.redirect(`/user/${userId}`);
}
