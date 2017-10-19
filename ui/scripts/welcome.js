// AUTH VARIABLE FOR REUSE
var auth = WeDeploy.auth('auth-scopesdemo.wedeploy.io');

// DISPLAY USER INFO
if (auth.currentUser.name) {
	document.querySelector('.username').innerHTML = auth.currentUser.name;
} else {
	document.querySelector('.username').innerHTML = auth.currentUser.email;
};

// REDIRECT IF NO USER SIGNED-IN
if (auth.currentUser == null) {document.location.href = '/';}

// SIGN-OUT USER
function out() {
	auth.signOut()
	.then(() => {
		document.location.href = '/';
	});
};