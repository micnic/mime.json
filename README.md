# mime.json

This is the list of file extensions with their mime types, nothing more. The list is extracted from [mime-db](https://github.com/jshttp/mime-db).

## Usage

```js
var mime = require('mime.json');

mime['js']; // => 'application/javascript'
mime.json;  // => 'application/json'
```