// Stream 7: Spawn a child process and process its stdout via pipes
var cp = require('child_process');
var who = cp.spawn("who"); // Returns a ChildProcess Object

var stream    = require('stream');
var objectify = new stream.Transform({objectMode: true});
var format    = new stream.Transform({objectMode: true});


// Convert each input line into an object and push it into the stream
objectify._transform = function(chunk, encoding, done){
  var me = this;
  var lines = chunk.toString().split('\n');
  lines.forEach( function(line){
    if ( line !== "" ) {
      var re   = /\s+/;                 // Define a regular expression
      var ul = line.split(re);        // Split on the regex
      var User = { "username": ul[0],
                   "tty": ul[1],
                   "date": ul[2] + " " + ul[3] + " " + ul[4]
                 };
      me.push(User);
    }
  });
  done();
};
 
// Format our output and push it into the stream
format._transform = function(obj, encoding, done){
  this.push("User " + obj.username + " is logged on to " 
		+ obj.tty + " since " + obj.date + "\n");
  done();
};


who.stdout
  .pipe(objectify)
  .pipe(format)
  .pipe(process.stdout);
