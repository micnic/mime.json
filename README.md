# mime.json

This is the list of file extensions with their mime types, nothing more. The list is extracted from [mime-db](https://www.npmjs.com/package/mime-db).

## Usage

```js
const mime = require('mime.json');

mime['js']; // => 'application/javascript'
mime.json;  // => 'application/json'
```