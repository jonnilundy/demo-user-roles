var express = require('express');
var wedeployMiddleware = require('wedeploy-middleware');

var app = express();

var authMiddleware = wedeployMiddleware.auth({
  url: 'auth-userroles.wedeploy.io',
  scopes: ['admin', 'free']
});

app.get('/', function(req, res) {
	res.send('Hello World!')
})

app.get('/admin', authMiddleware, function(req, res) {
  // User that has been signed in
  console.log('User: ', res.locals.auth.currentUser);
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})

function retrieveCurrentUser(res) {
  if (
    res &&
    res.locals &&
    res.locals.auth &&
    res.locals.auth.currentUser
  ) {
    return res.locals.auth.currentUser;
  }
}