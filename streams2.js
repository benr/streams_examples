// Stream 2: This just acts like "cat"

var fs = require('fs')
var source = fs.createReadStream('/etc/passwd'); // Readable Stream
var dest   = process.stdout;			 // Writable Stream

source.pipe(dest);	// Connect the "source" stream to the "dest" stream

/* 
source.on('data', function (d) {
  console.log("Some data came:\n" + d );
})
*/
