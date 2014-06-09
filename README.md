# Node.js Streams in Action

These are some simple code examples I wrote up to help learn Node.js Streams.

* *stream1.js*: Simple event listener on a readable stream (anti-example)
* *stream2.js*: "cat" implemented in Node, stdin piped to stdout; simplest possible example of piping streams in action
* *stream3.js*: Example of a transform duplex stream, takes stdin, converts it to upper case and sends to stdout
* *stream3a.js*: Same as stream3, but the transform method is moved into a module and unneccisary declarations are removed
* *stream4.js*: Tranform based on JSON input from a file (stream4.json) using a single transform, plus adding a method to the objects
* *stream5.js*: Same as stream4 but stripped into more granular transforms

# See also:

* [Node.js Stream API Documentation](http://nodejs.org/api/stream.html) 
* ["Practical Examples of the New Node.js Streams API"](http://strongloop.com/strongblog/practical-examples-of-the-new-node-js-streams-api/)
* [Substack's "Stream Handbook"](https://github.com/substack/stream-handbook)
