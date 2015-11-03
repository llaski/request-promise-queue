'use strict';

module.exports = function(arr, size) {

	size = parseInt(size) || 2;
	var result = [];

	for (var x = 0, l = arr.length; x < l; x += size) {
		result.push(arr.slice(x, x + size));
	}

	return result;
};