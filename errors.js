
require('./dandy');

/**
 * Asynchronous bind
 *
 * Automatically passes errors and exceptions to the callback.
 */
exports.abind = function(fn, cb, self) {
	return function(err, result) {
		if (err) { if (cb) cb(err); return; }

		try {
			return fn.apply(self, arguments);	
		} catch (exc) {
			exports.logException(exc);
			if (cb) cb(exc);
		}
	}
}

/**
 * Asynchronous bind
 *
 * Automatically passes errors and exceptions to the callback.
 */
exports.ibind = function(fn, cb, self) {
	return function() {
		try {
			return fn.apply(self, arguments);	
		} catch (exc) {
			exports.logException(exc);
			if (cb) cb(exc);
		}
	}
}

/**
 * Logs exceptions to stderr in a friendly way.
 */
exports.logException = function(exc, detail) {
	var util = require('util');

	if (detail) {
		util.debug(detail);
	}
	if (exc.stack) {
		util.debug(exc.stack);		
	} else {
		var err = exc+'';
		if (err == '[object Object]') {
			util.debug(util.inspect(exc));
		} else {
			util.debug(exc);
		}
	}
};
