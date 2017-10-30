import config from '../config';
import wedeploy from 'wedeploy';

const auth = wedeploy.auth(config.authServiceUrl);

/**
 * Post Login Route
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 */
export async function postLogin(req, res, next) {
  try {
    await auth.signInWithEmailAndPassword(req.body.email, req.body.password);
    const currentUser = auth.currentUser;
    res.cookie('access_token', auth.currentUser.token);
    if (currentUser.hasSupportedScopes('admin')) {
      res.redirect('/admin');
    } else if (currentUser.hasSupportedScopes('free')) {
      res.redirect('/profile');
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    res.redirect('/?cmd=fail');
  }
}
