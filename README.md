# WeDeploy User Role Demo

This demo shows how one can use WeDeploy's **Auth** and **Node** services to

- [create users](https://github.com/jonnilundy/demo-user-roles/blob/master/node/routes/post-user.js#L14-L19)
- [authenticate users with wedeploy-middleware](https://github.com/jonnilundy/demo-user-roles/blob/master/node/src/index.js#L30-L40)
- [manage users' roles (supportedScopes)](https://github.com/jonnilundy/demo-user-roles/blob/master/node/routes/upgrade.js)
- [sign in with email and password](https://github.com/jonnilundy/demo-user-roles/blob/master/node/routes/post-login.js#L14)
- [retrieve users](https://github.com/jonnilundy/demo-user-roles/blob/master/node/routes/admin.js#L21)
- update users

The examples inside this demo also change behavior depending on the user's role (`free` or `admin`).

If this is your first encounter with WeDeploy, feel free to checkout [our website](https://wedeploy.com/), our [auth docs](https://wedeploy.com/docs/auth), or our [node docs](https://wedeploy.com/docs/deploy/deploying-nodejs/) to gain a more in-depth understanding of these services.

## Deploying

#### Fork/Clone
Fork this repo and clone it to your local machine.

#### Create WeDeploy Project
Login to the [WeDeploy Console](https://console.wedeploy.com) and create a new project.

#### Update the config file with your project's information
Use your auth service url ('auth-YOURPROJECTNAME.wedeploy.io') and master token of the project you just created and update the config file.

#### Deploy with one command
Go to the source code in your command line and run `we deploy -p yourproject`

Now your project will be live at node-yourproject.wedeploy.io.

#### Run locally
After creating your auth service in WeDeploy,
use `npm run dev` to see the app run locally. Don't forget to install npm packages first.

#### Explore

The flow of the app goes as follows:

1. GET /signup
2. Create user and get logged in with POST /user

OR

1. GET /login
2. You'll be logged in and redirected to the proper webpage in POST /login

3. You'll be at either /admin or /profile depending on your scope
4. See user's information at /user/:userId with `admin` scope
5. Upgrade or downgrade user's scopes with POST /upgrade/user/:userId or POST /downgrade/user/:userId

![](https://d26dzxoao6i3hh.cloudfront.net/items/36262m102x2X2Z2A0l1i/Screen%20Shot%202017-10-27%20at%209.31.32%20AM.223a2f1S1g2O.png)

#### Create

With the basic building blocks of Auth, you'll be able to construct a complex app with accessible authentication measures. If you have any questions, don't hesistate to reach out to us at Wedeploy.com!

