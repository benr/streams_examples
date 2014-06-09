/* 
  Re-implemented streams3.js exaple, but this time we:
     1) Avoid creating new variables for stdin & stdout
     2) Move the definition of the "upper" transform stream into a module
*/

var upper  = require('./upper');	// Duplex Transform Stream

process.stdin
  .pipe(upper)
  .pipe(process.stdout);
