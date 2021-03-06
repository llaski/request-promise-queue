'use strict';

var request = require('request');

module.exports = function(requestOptions, data) {

	var successData = [];

	var sendRequest = function sendRequest(currentData, queuedData, resolve, reject) {

		if (currentData === undefined) {
			resolve(successData);
			return;
		}

		request(requestOptions, function(error, response, body) {

			if (error) {
				reject(error);
				return;
			}

			successData.push({
				response: response,
				body: body
			});

			setTimeout(function() {
				sendRequest(queuedData.shift(), queuedData, resolve, reject);
			}, requestOptions.delay || 0);
		})
	};

	return new Promise(function(resolve, reject) {
		sendRequest(data.shift(), data, resolve, reject);
	});

};