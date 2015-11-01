'use strict';

//Problem - have a huge # of reuqests we need to make and fire one callback once there all done - promises seems to make this easy,
//but we dont want to slam our server with 400 requests at once so we need to break them up into chunks
//however doing it this way we need to setup a way to make synchronous requests while still using promises to make life easy to handle the final callback

//Idea - take a list of requests (say 400) and split them into say 4 queues
//Each queue processes each request synchrounously
//Each queue is essentiall a promise, which resolves once all requests have finished or rejects once one has failed (or optionally continues until all are done and never rejects)
//Can put each queue promise into Promise.all and fire your handles there
//
//
//
//
//Take in:
//url to hit
//options, including method type
//array of data for each



// RequestPromiseQueue.fire(url, requestOptions, arrayData).then(function(){}, function() {})
//

var Promise = require('es6-promise').Promise;
var defaultsDeep = require('lodash.defaultsdeep');
var chunk = require('./lib/chunk');
var queueRequests = require('./lib/queueRequests');

module.exports = {

	send: function(uri, requestOptions, requestData) {
		if (!uri) {
			throw new Error('A uri must be provided');
		}

		requestOptions = defaultsDeep(requestOptions || {}, {
			uri: uri
		});

		requestData = defaultsDeep(requestData || {}, {
			data: [],
			size: 2
		});

		var queues = chunk(requestData.data, requestData.size).map(function(arr) {
			return queueRequests(requestOptions, arr);
		});

		return Promise.all(queues);
	}
};