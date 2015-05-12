/**
 * From http://stackoverflow.com/questions/17581830/load-node-js-module-from-string-in-memory
 */

module.exports = function requireFromString(src, filename) {
	var Module = module.constructor;
	var m = new Module();
	m._compile(src, filename);
	return m.exports;
};