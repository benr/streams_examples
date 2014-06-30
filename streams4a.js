// Stream 4: Process JSON as a stream of objects

var fs     = require('fs')
var stream = require('stream');

var source = fs.createReadStream('./streams4.json'); // Readable Stream
var calc   = new stream.Transform({objectMode: true});  // Transform stream
// process.stdout is our writable stream


calc._transform = function( chunk, encoding, done ){

  var me = this;  // Copy this so that we can use it in a lower scope for pushing

  var data = JSON.parse(chunk);
  if ( Array.isArray(data) ) {
    console.log(" -- DEBUG: Input is an array");

    data.forEach( function(element, index, array){

       // Associate a method with the object
       element.util = function(){
         console.log(" -- DEBUG: Executing util() method for " + this.used_ram);
         return(this.used_ram / this.total_ram * 100);
       }

       me.push("Got object for " + element.host + " - Utilization Rate: " + element.util() + "% \n");
    });

  } else {
    console.log(" -- DEBUG: Input is NOT array");
  }

  done();
};

source.on('end', function(){
  console.log("We're done.");
});

source
  .pipe(calc)
  .pipe(process.stdout);


