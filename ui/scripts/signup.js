// AUTH VARIABLE FOR REUSE
var auth = WeDeploy.auth('auth-scopesdemo.wedeploy.io').auth(WeDeploy.auth('auth-scopesdemo.wedeploy.io').currentUser.token);

// CREATE USER FROM FORM
function userCreate() {
	auth.createUser({
		email: user.email.value,
		name: user.name.value,
		password: user.password.value,
		supportedScopes: [user.role.value]
	})
	.then(function() {
		auth.signInWithEmailAndPassword(user.email.value, user.password.value)
		.then(function() {
			document.location.href = '/welcome.html';
		})
	})
	.catch(function() {
		alert('Sign-up failed. Try another email.');
	})
};