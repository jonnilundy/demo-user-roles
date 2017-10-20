const express = require('express');
const wedeploy = require('wedeploy');
const wedeployMiddleware = require('wedeploy-middleware');
const path = require('path');
const bodyParser = require('body-parser');
const postLogin = require('./routes/post-login');
const cookieParser = require('cookie-parser')
const auth = wedeploy.auth('auth-userroles.wedeploy.io').auth('e685224b-9431-4580-824d-1358954bbcca');

const app = express();

app.use(cookieParser());
app.use(express.static('public/assets/styles'));

app.use(bodyParser.urlencoded({extended: true}));

const adminMiddleware = wedeployMiddleware.auth({
  url: 'auth-userroles.wedeploy.io',
  scopes: ['admin']
});

const freeMiddleware = wedeployMiddleware.auth({
  url: 'auth-userroles.wedeploy.io',
  scopes: ['admin', 'free']
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/static/index.html'));
})

app.get('/login', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/static/index.html'));
})

app.get('/signup', function(req, res) {
  if (req.query.cmd === 'fail') {
    alert('Sign-up failed. Try another email.');
  }

  res.sendFile(path.join(__dirname, 'public/static/signup/index.html'));
})

app.post('/user', function(req, res) {
  auth.createUser({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    supportedScopes: ['admin']
  })
  .then(function() {
    auth.signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(function() {
      res.redirect('/user?access_token=' + auth.currentUser.token);
    })
  })
  .catch(function() {
    res.redirect('/signup?cmd=fail');
  })
})

app.post('/login', postLogin);

app.get('/user', freeMiddleware, function(req, res) {
  res.sendFile(path.join(__dirname, 'public/static/user/index.html'));
})

app.get('/admin', adminMiddleware, function(req, res) {
  res.sendFile(path.join(__dirname, 'public/static/admin/index.html'));
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