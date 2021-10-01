import { writeFile } from 'fs/promises';
import fetch from 'node-fetch';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const template = `declare module 'mime.json' {
	const mime: $;

	export default mime;
}`;

const dir = dirname(fileURLToPath(import.meta.url));
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
				console.error('Extensions are not included in array');
			}
		}
	});

	Object.keys(list).sort().forEach((key) => {
		result[key] = list[key];
	});

	return JSON.stringify(result, null, '\t');
};

const declareTypes = (data) => {
	return template.replace('$', data)
		.replace('};', '\t};')
		.replaceAll('\t"', '\t\t"');
};

const writeResult = async (data) => {
	try {
		await writeFile(`${dir}/index.json`, data);
		console.log('Successfully created index.json');
	} catch (error) {
		console.error('Can not write result json');
		console.error(error.stack);
	}
};

const writeTypes = async (data) => {
	try {
		await writeFile(`${dir}/index.d.ts`, declareTypes(data));
		console.log('Successfully created index.d.ts');
	} catch (error) {
		console.error('Can not write types');
      	console.error(error.stack);
	}
};

try {
	const response = await fetch(src);
	const data = await response.json();
	const result = prepareResult(data);

	await writeResult(result);
	await writeTypes(result);
} catch (error) {
	console.error('Can not parse received source json');
	console.error(error.stack);
}