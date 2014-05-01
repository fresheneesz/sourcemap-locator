// returns a buffer of the decoded contents
// derived from http://stackoverflow.com/questions/11335460/how-do-i-parse-a-data-url-in-node
module.exports = function(dataUrl) {
    var fs = require('fs');
    var regex = /^data:.+\/(.+);base64,(.*)$/;

    var matches = dataUrl.match(regex);
    var data = matches[2];
    return new Buffer(data, 'base64').toString()
}