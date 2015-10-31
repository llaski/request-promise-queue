module.exports = (arr, size) => {

	size = parseInt(size) || 2;
	let result = [];

	for (let x = 0, l = arr.length; x < l; x += size) {
		result.push(arr.slice(x, x + size));
	}

	return result;
};