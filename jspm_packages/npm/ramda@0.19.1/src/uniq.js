/* */ 
var identity = require('./identity');
var uniqBy = require('./uniqBy');
module.exports = uniqBy(identity);
