const wedeploy = require('wedeploy');
const auth = wedeploy.auth('auth-userroles.wedeploy.io')
  .auth('e685224b-9431-4580-824d-1358954bbcca');

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
