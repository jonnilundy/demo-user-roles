/**
 * HandleBars Update Link Helper
 * @param  {Auth} user
 * @return {String} HTML string of update link
 */
export function handlebarsUpdateHelper(user) {
  if (user.supportedScopes[0] === 'free') {
    return '<a class="update-link" href="/upgrade/' + user.id + '">Upgrade to Admin User</a>';
  } else {
  	return '<a class="update-link" href="/downgrade/' + user.id + '">Downgrade to Free User</a>';
  }
}