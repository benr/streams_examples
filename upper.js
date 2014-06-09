// UpperCase Transform Module

var stream = require('stream');
var upper  = new stream.Transform();

upper._transform = function (chunk, encoding, done) {
  var data = chunk.toString()
  this.push( data.toUpperCase() );
  done();
};

module.exports = upper;
