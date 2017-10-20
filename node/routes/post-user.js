const wedeploy = require('wedeploy');
const auth = wedeploy.auth('auth-userroles.wedeploy.io')
  .auth('e685224b-9431-4580-824d-1358954bbcca');

/**
 * Post User Route
 * @param  {Request} req 
 * @param  {Response} res
 * @param  {Function} next
 */
export async function postUser(req, res, next) {
  try {
    await auth.createUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      supportedScopes: ['admin'],
    });
    await auth.signInWithEmailAndPassword(req.body.email, req.body.password);
    res.redirect('/user?access_token=' + auth.currentUser.token);
  } catch (error) {
    res.redirect('/signup?cmd=fail');
  }
}
