import config from '../config';
import wedeploy from 'wedeploy';

const auth = wedeploy.auth(config.authServiceUrl);

/**
 * Post User Route
 * @param  {Request} req 
 * @param  {Response} res
 * @param  {Function} next
 */
export async function users(req, res, next) {
  try {
    const currentUser = res.locals.auth.currentUser;
    await auth.loadCurrentUser(currentUser.token);
    const allUsers = await auth.getAllUsers();
    res.send(allUsers);
  } catch (error) {
    throw error;
  }
}
