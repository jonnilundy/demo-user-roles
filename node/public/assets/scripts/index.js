// AUTH ENDPOINT
var auth = WeDeploy.auth('auth-userroles.wedeploy.io');


// PASSWORD SIGN-IN
function signInUser() {
	auth.signInWithEmailAndPassword(user.email.value, user.password.value)
	.then(function() {
		document.location.href = "/user";
	})
	.catch(function() {
		alert('Sign-in failed. Try another email/password.');
	});
};

// REDIRECT IF USER IS ALREADY LOGGED-IN
if (auth.currentUser) {document.location.href = '/welcome.html';}