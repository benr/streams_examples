// Stream 5: Process JSON as a stream of objects like streams4.js but with more granular transforms

var fs     = require('fs')
var stream = require('stream');

var source      = fs.createReadStream('./streams4.json'); // Readable Stream
var objectify   = new stream.Transform({objectMode: true});  // Transform stream
var utilization = new stream.Transform({objectMode: true});  // Transform stream
var format      = new stream.Transform({objectMode: true});  // Transform stream
// process.stdout is our writable stream


objectify._transform = function( chunk, encoding, done ){
  var me = this;  
  var data = JSON.parse(chunk);
  if ( Array.isArray(data) ) {

    data.forEach( function(element, index, array){
       console.log("   -- DEBUG: Pushing " + element.host);
       me.push(new Object(element));
    });
  } else {
    console.log("   -- DEBUG: Pushing " + data.host);
    me.push(new Object(data));
  }
  done();
};

utilization._transform = function( obj, encoding, done ){
  console.log("   -- DEBUG: Adding utilization methods to " + obj.host);
  obj.util = function(){
    return(this.used_ram / this.total_ram * 100);
  }
  this.push(obj);
  done();
};


format._transform = function( obj, encoding, done ){
  console.log("   -- DEBUG: Formating output of " + obj.host);
  this.push("Got object for " + obj.host + " - Utilization Rate: " + obj.util() + "% \n");
  done();
};



source
  .pipe(objectify)
  .pipe(utilization)
  .pipe(format)
  .pipe(process.stdout);


