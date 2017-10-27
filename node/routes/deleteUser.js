import config from '../config';
import wedeploy from 'wedeploy';

const auth = wedeploy.auth(config.authServiceUrl).auth(config.masterToken);

/**
 * Delete User Route
 * @param  {Request} req 
 * @param  {Response} res
 * @param  {Function} next
 */
export async function deleteUser(req, res, next) {
  const userId = req.params.userId;

  try {
    await auth.deleteUser(userId);
    res.redirect('/admin');
  } catch (error) {
    res.redirect('/admin');
  }
}
