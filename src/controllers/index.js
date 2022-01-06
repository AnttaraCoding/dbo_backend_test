const path              = require("path")
const normalizedPath    = path.join(__dirname);
const fs                = require('fs')
let result = {};

fs.readdirSync(normalizedPath).forEach(function(file) {
    if(file != 'index.js'){        
        const name = path.parse(file).name
        global[name] = require(`./${file}`)
        result[path.parse(file).name] = global[name];
    }
});

module.exports = result


