'use strict';

var RequestPromiseQueue = require('../src/RequestPromiseQueue');
window.RequestPromiseQueue = RequestPromiseQueue;

//Example functions
var form = document.getElementById('form');
var file = document.getElementById('file');
var resultList = document.getElementById('result-list');

form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    if (!file.files.length) {
        return;
    }

    window.Papa.parse(file.files[0], {
        complete: function complete(data) {
            uploadData(data.data);
        }
    });
});

var uploadData = function uploadData(data) {
    var url = window.location.origin + '/response.json';
    var numConcurrentRequests = 25;
    var size = Math.round(data.length / numConcurrentRequests);

    resultList.innerHTML = '<i class="fa fa-spinner fa-pulse" style="margin: 20px auto;"></i><p>Processing Results...</p>';

    window.RequestPromiseQueue.send(url, {
        delay: 3000
    }, {
        data: data,
        size: size,
    }).then(function(results) {
        resultList.innerHTML = '';
        displayResults(results);
    });
};

var displayResults = function displayResults(results) {
    results.forEach(function(resultSet) {

        if (Array.isArray(resultSet)) {
            displayResults(resultSet);
            return;
        }

        var body = JSON.parse(resultSet.body);

        if (!Array.isArray(body)) {
            body = [body];
        }

        body.forEach(function(item) {
            var li = document.createElement('li');
            li.innerHTML = item.name;
            resultList.appendChild(li);
        });

    });
};