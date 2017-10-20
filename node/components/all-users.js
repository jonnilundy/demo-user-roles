const handlebars = require('handlebars');

/**
 * Create User List
 */
export async function userList(req, res, next) {
  await Handlebars.registerHelper('list', function(user) {
    var userList = "<div class='user-list'>";

    for(var i=0, l=user.length; i<l; i++) {
      userList = userList +
        "<div class="name">" + user.name[i] + "</div>" +
        "<div class="email">" + user.email[i] + "</div>" +
        "<div class="role">" + user.supportedScopes[i] + "</div>" +
    }

    return userList + "</div>";
  })
}