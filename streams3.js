// Stream 3: Using a transform duplex stream
/* OUTPUT:

$ echo "hello" | node streams3.js
HELLO

*/

var stream = require('stream');

var src    = process.stdin;  		// Readable Stream
var dest   = process.stdout;		// Writable Stream
var upper  = new stream.Transform();	// Duplex Transform Stream


// Define the transform function on the transform stream
upper._transform = function (chunk, encoding, done) {

  var data = chunk.toString()
  this.push( data.toUpperCase() );
  done();
};

// Connect the readable input (stdio) stream, 
// to the "upper" transform stream, 
// to the writable output (stdout) stream
src.pipe(upper).pipe(dest);	

/* 
The pipes are sometimes split on lines for readability, like:
  src
    .pipe(upper)
    .pipe(dest);	

Also, note that src & dest didn't need to be defined because they are
 default provided streams, so we could have used:

process.stdin
  .pipe(upper)
  .pipe(process.stdout);
*/

