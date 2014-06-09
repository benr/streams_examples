// Stream 6: Same as Stream 5 but use HTTP Request instead of local file

var http   = require('http');
var stream = require('stream');

// the http.request response is a Readable Stream
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

var options = {
  host: 'www.cuddletech.com',
  path: '/test.json'
};

http.request(options, function(res) {

   res 
    .pipe(objectify)
    .pipe(utilization)
    .pipe(format)
    .pipe(process.stdout);


}).end();




