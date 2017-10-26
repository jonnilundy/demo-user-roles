import express from 'express';
import wedeployMiddleware from 'wedeploy-middleware';
import bodyParser from 'body-parser';
import handlebars from 'handlebars';
import cookieParser from 'cookie-parser';
import {postLogin} from '../routes/post-login';
import {postUser} from '../routes/post-user';
import {login} from '../routes/login';
import {users} from '../routes/users';
import {profile} from '../routes/profile';
import {user} from '../routes/user';
import {deleteUser} from '../routes/deleteUser';
import {signup} from '../routes/signup';
import {admin} from '../routes/admin';
import {upgrade} from '../routes/upgrade';
import {downgrade} from '../routes/downgrade';
import {handlebarsListHelper} from '../components/all-users';
import {handlebarsUpdateHelper} from '../components/update';

const app = express();

app.use(cookieParser());
app.use(express.static('assets/styles'));
app.use(bodyParser.urlencoded({extended: true}));

handlebars.registerHelper('list', handlebarsListHelper);
handlebars.registerHelper('update', handlebarsUpdateHelper);

const adminMiddleware = wedeployMiddleware.auth({
  url: 'auth-userroles.wedeploy.io',
  scopes: ['admin'],
  redirect: '/',
});

const freeMiddleware = wedeployMiddleware.auth({
  url: 'auth-userroles.wedeploy.io',
  scopes: ['free'],
  redirect: '/',
});

app.get('/', login);
app.get('/login', login);
app.get('/signup', signup);
app.get('/profile', freeMiddleware, profile);
app.get('/user/:userId', adminMiddleware, user);
app.get('/admin', adminMiddleware, admin);
app.get('/users', adminMiddleware, users);
app.post('/user', postUser);
app.post('/login', postLogin);
app.get('/upgrade/:userId', adminMiddleware, upgrade);
app.get('/downgrade/:userId', adminMiddleware, downgrade);
// app.delete('/user/delete/:userId', adminMiddleware, deleteUser);

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

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(4000, function() {
  console.log('Example app listening on port 4000!');
});

