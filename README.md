# WeDeploy User Role Demo

This demo shows how to create users with roles (supportedScopes) and customize the apps behavior depending on the user's role.

If this is your first encounter with WeDeploy, feel free to checkout our website to better understand

## Deploying

#### Fork/Clone
Fork this repo and clone it to your local machine.

#### Create WeDeploy Project
Login to the [WeDeploy Console](https://console.wedeploy.com) and create a new project.

#### Update all request endpoints
Use the ID and master token of the project you just created and replace on all requests (anywhere there is `.auth('')`).

#### Deploy with one command
Go to the source code in your command line and run `we deploy -p yourproject`

Now your project will be live at node-yourproject.wedeploy.io.

#### Create