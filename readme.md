# mime.json

[![npm version](https://img.shields.io/npm/v/mime.json.svg?logo=npm&style=flat-square)](https://www.npmjs.com/package/mime.json)
[![npm downloads](https://img.shields.io/npm/dm/mime.json.svg?style=flat-square)](https://www.npmjs.com/package/mime.json)
[![npm types](https://img.shields.io/npm/types/mime.json.svg?style=flat-square)](https://www.npmjs.com/package/mime.json)
[![license](https://img.shields.io/npm/l/mime.json.svg?style=flat-square)](https://www.npmjs.com/package/mime.json)

This is the list of file extensions with their mime types, nothing more. The list is extracted from [mime-db](https://www.npmjs.com/package/mime-db).

## Usage

```js
import mime from 'mime.json';

mime['js']; // => 'application/javascript'
mime.json;  // => 'application/json'
```