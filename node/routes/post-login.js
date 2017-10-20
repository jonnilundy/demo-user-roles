const wedeploy = require('wedeploy');
const auth = wedeploy.auth('auth-userroles.wedeploy.io').auth('e685224b-9431-4580-824d-1358954bbcca');
const cookieParser = require('cookie-parser')

const postLogin = function(req, res) {
  auth.signInWithEmailAndPassword(req.body.email, req.body.password)
  .then(function() {
    const currentUser = auth.currentUser;
    res.cookie('access_token', auth.currentUser.token)
    if (currentUser.hasSupportedScopes('free')) {
      res.redirect('/user');
    } 
    else if (currentUser.hasSupportedScopes('admin')) {
      res.redirect('/admin');
    }
    else {
      res.redirect('/login');  
    }
  })
}

module.exports = postLogin;