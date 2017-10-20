const wedeploy = require('wedeploy');
const auth = wedeploy.auth('auth-userroles.wedeploy.io')
  .auth('e685224b-9431-4580-824d-1358954bbcca');

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
    if (currentUser.hasSupportedScopes('free')) {
      res.redirect('/user');
    } else if (currentUser.hasSupportedScopes('admin')) {
      res.redirect('/admin');
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    res.redirect('/?cmd=fail');
  }
}
