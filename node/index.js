import express from 'express';
import wedeployMiddleware from 'wedeploy-middleware';
import path from 'path';
import bodyParser from 'body-parser';
import {postLogin} from './routes/post-login';
import {postUser} from './routes/post-user';
import {users} from './routes/users';
import cookieParser from 'cookie-parser';
import handlebars from 'handlebars';
import {readFileSync} from 'fs';

const app = express();

app.use(cookieParser());
app.use(express.static('public/assets/styles'));
app.use(bodyParser.urlencoded({extended: true}));

const adminMiddleware = wedeployMiddleware.auth({
  url: 'auth-userroles.wedeploy.io',
  scopes: ['admin'],
});

const freeMiddleware = wedeployMiddleware.auth({
  url: 'auth-userroles.wedeploy.io',
  scopes: ['free'],
});

app.get('/', (req, res) => {
  const source = readFileSync('./pages/index.html').toString();
  const template = handlebars.compile(source);
  const html = template({title: 'Welcome'});
  res.send(html);
});

app.get('/login', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/static/index.html'));
});

app.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/static/signup/index.html'));
});

app.get('/logout', (req, res, next) => {
  res.clearCookie('access_token');
  res.redirect('/');
});

app.put('/user', adminMiddleware, async function(req, res, next) {
  const currentUser = res.locals.auth.currentUser;
  await currentUser.updateUser({
    supportedScopes: ['admin'],
  });
  res.redirect('/users');
});

app.post('/user', postUser);

app.post('/login', postLogin);

app.get('/users', adminMiddleware, users);

app.get('/user', freeMiddleware, function(req, res) {
  res.sendFile(path.join(__dirname, 'public/static/user/index.html'));
});

app.get('/admin', adminMiddleware, function(req, res) {
  res.sendFile(path.join(__dirname, 'public/static/admin/index.html'));
});

app.listen(4000, function() {
  console.log('Example app listening on port 4000!');
});
