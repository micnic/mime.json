'use strict';

var fs = require('fs'),
	https = require('https');

var src = 'https://raw.githubusercontent.com/jshttp/mime-db/master/db.json';

function prepareResult(json) {

	var list = {},
		result = {};

	Object.keys(json).forEach(function (key) {
		if (json[key].extensions) {
			if (Array.isArray(json[key].extensions)) {
				json[key].extensions.forEach(function (extension) {
					list[extension] = key;
				});
			} else {
				console.error('Extensions are not inluded in array');
			}
		}
	});

	Object.keys(list).sort().forEach(function (key) {
		result[key] = list[key];
	});

	return result;
}

function writeResult(data) {
	fs.writeFile(__dirname + '/index.json', data, function (error) {
		if (error) {
			console.error('Can not write result json');
			console.error(error.stack);
		} else {
			console.log('Successfully created mime.json');
		}
	});
}

https.get(src).on('error', function (error) {
	console.error('Can not get source json');
	console.error(error.stack);
}).on('response', function (response) {

	var body = '';

	response.on('readable', function () {

		var data = this.read() || Buffer(0);

		body += String(data);
	}).on('end', function () {

		var json = null;

		try {
			json = JSON.parse(body);

			if (json && typeof json === 'object') {
				writeResult(JSON.stringify(prepareResult(json), null, '\t'));
			} else {
				console.error('Parsed source json is not an object');
			}
		} catch (error) {
			console.error('Can not parse received source json');
			console.error(error.stack);
		}
	});
});