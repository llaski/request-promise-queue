var Promise = require('es6-promise').Promise;

module.exports = function(url, requestOptions, data) {

	var successData = [];

	var sendRequest = function sendRequest(currentData, queuedData, resolve, reject) {

		if (!currentData) {
			resolve(successData);
			return;
		}

		request(requestOptions, function(error, response, body) {
			if (error) {
				reject(error);
			} else {
				successData.push({
					response: response,
					body: body
				});

				sendRequest(queuedData.shift(), queuedData, resolve, reject);
			}
		});
	};

	return new Promise(function(resolve, reject) {
		sendRequest(data.shift(), data, resolve, reject);
	});

};