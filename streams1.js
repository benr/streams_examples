// Stream 2: This just acts like "cat"

var fs = require('fs')
var source = fs.createReadStream('/etc/passwd'); // Readable Stream

// Event Listner for data on the readable stream
source.on('data', function (d) {
  console.log("Some data came:\n" + d );
})
