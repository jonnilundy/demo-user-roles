/**
 * HandleBars Update Link Helper
 * @param  {Auth} user
 * @return {String} HTML string of update link
 */
export function handlebarsScopeHelper(user) {
  if (user.supportedScopes[0] === 'free') {
    return '<option value="admin">Admin</option><option value="free" selected>Free</option>';
  } else {
  	return '<option value="admin" selected>Admin</option><option value="free">Free</option>';
  }
}