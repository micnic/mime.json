'use strict';

const fs = require('fs');
const https = require('https');

const src = 'https://raw.githubusercontent.com/jshttp/mime-db/master/db.json';

const prepareResult = (json) => {

	const list = {};
	const result = {};

	Object.keys(json).forEach((key) => {
		if (json[key].extensions) {
			if (Array.isArray(json[key].extensions)) {
				json[key].extensions.forEach((extension) => {
					list[extension] = key;
				});
			} else {
				console.error('Extensions are not inluded in array');
			}
		}
	});

	Object.keys(list).sort().forEach((key) => {
		result[key] = list[key];
	});

	return result;
};

const writeResult = (data) => {
	fs.writeFile(`${__dirname}/index.json`, data, (error) => {
		if (error) {
			console.error('Can not write result json');
			console.error(error.stack);
		} else {
			console.log('Successfully created mime.json');
		}
	});
};

https.get(src).on('error', (error) => {
	console.error('Can not get source json');
	console.error(error.stack);
}).on('response', (response) => {

	let body = '';

	response.on('readable', () => {

		const data = response.read() || Buffer(0);

		body += String(data);
	}).on('end', () => {

		let json = null;

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