// Stream 1: This just acts like "cat"
// This isn't really a stream at all, its just an event handler on a Readable Stream

var fs = require('fs')
var source = fs.createReadStream('/etc/passwd'); // Readable Stream

// Event Listner for data on the readable stream
source.on('data', function (d) {
  console.log("Some data came:\n" + d );
})
