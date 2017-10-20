// AUTH VARIABLE FOR REUSE
var auth = WeDeploy.auth('auth-userroles.wedeploy.io');

// DISPLAY USER INFO
document.querySelector('.username').innerHTML = auth.currentUser.name;

// SIGN-OUT USER
function out() {
	auth.signOut()
	.then(() => {
		document.location.href = '/';
	});
};