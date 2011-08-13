
/**
 * Shorthand for console.log
 *
 * Best way to use is to write D&&D("message")
 * In production, just set the global variable D to null.  This allows you to leave in debug
 * statements, but limit their cost to the boolean test of the D variable.  
 */
function D() {
	if (console.log.apply) {
		console.log.apply(console, arguments);
	} else {
		var args = []; args.push.apply(args, arguments);
		console.log(args.join(' '));
	}
}

try {
	// Node.js version
	global.D = D;
	Error.stackTraceLimit = 1000;
} catch (exc) {
	// Browser version
	window.D = D;
}
