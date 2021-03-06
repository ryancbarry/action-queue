var assert = require('assert');
var ActionQueue = require('../index');

describe('README example', function() {
  it('have no mistakes', function() {
    // 1. Create a queue object.
    var queue = new ActionQueue();

    // 2. Add actions to it.
    queue.addAction(function(){
      // Action does some stuff...
      console.log('Doing stuff...', arguments);
    }, ['arg1', 'arg2']);

    queue.addAction(function(){
      // Another action does some other stuff...
      console.log('Doing more stuff...', arguments);
    });

    // 3. Bundle those actions up into a "step".
    // A step is a series of actions.
    queue.endStep();

    // 4. Build more steps if you want.
    // For each step you want to build, add more actions, then call `endStep()`.
    queue.addAction(function(){
      // This action runs in step 2.
      console.log('Doing next step stuff...', arguments);
    });
    queue.endStep();
    queue.addAction(function(){
      // This action runs in step 2.
      console.log('Step 3 stuff...', arguments);
    });
    queue.endStep();

    // Note that, at this point, all these actions are just being queued up, and haven't been run yet,
    // so our actions haven't displayed anything to the console yet.

    // 5. Run your actions! `runNextStep()` runs the next step in the queue (which means each action in that step will execute in order). 
    queue.runNextStep();

    // ````
    // Doing stuff... { '0': 'arg1', '1': 'arg2' }
    // Doing more stuff... {}
    // ````

    // 6. If you call `wait()`, any subsequent calls to `runNextStep()` do nothing. 
    // If you pass a callback into `wait()`, it'll be called in the event the queue stops waiting.
    queue.wait();

    // 7. If you call `onComplete()` and pass in a callback,
    // it will be called when `complete()` is called
    // or when `runNextStep()` finishes running all the next step's actions.
    queue.onComplete(function(){
      console.log("Complete event triggered!");
    });

    // Since we're waiting now, this call has no effect.
    queue.runNextStep();

    // 8. Stop waiting!
    queue.complete();

    // ````
    // Complete event triggered!
    // ````

    queue.runNextStep();

    // ````
    // Doing next step stuff... {}
    // Complete event triggered!
    // ````

    queue.runNextStep();

    // ````
    // Step 3 stuff... {}
    // Complete event triggered!
    // ````

    // All our steps have been run and flushed out of the queue at this point.
  });
});

// // Testing future facet tools
// describe('test', function () {
//   it('foo', function () {
//     // var _ = require('underscore');

//     // Imbue transformation
//     var imbue = function () {
//       var self = this;
//       var sources = [].slice.call(arguments, 0);
//       sources.forEach(function (source) {
//         Object.getOwnPropertyNames(source).forEach(function(propName) {
//           Object.defineProperty(self, propName,
//             Object.getOwnPropertyDescriptor(source, propName));
//         });
//       });
//       return self;
//     };

//     // Property facet constructor
//     var PropertyFacet = function(propertyName) {
//       var internalPropertyName = '_'+propertyName;
//       Object.defineProperty(this, propertyName, {
//         get: function() {
//           console.log('getter called');
//           return this[internalPropertyName];
//         }
//         , set: function (v) {
//           console.log('setter called with value: '+v);
//           this[internalPropertyName] = v;
//         }
//         , configurable: true
//         , enumerable: true
//       });
//       return this;
//     };

//     // Crab constructor
//     var Crab = function(name) {
//       var self = this;
//       var propertyName = 'name';
//       imbue.call(self, new PropertyFacet(propertyName));
//       self[propertyName] = name;
//       return self;
//     };
 
//     var c = new Crab('Crabbie');
//     console.log('marker: c.name:\n', c.name);
//   })
// })
