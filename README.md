# Action Queue

Queues up actions for control over when they run.

### Usage

1. Create a queue object.

        var ActionQueue = require('action-queue');
        var queue = new ActionQueue();

2. Add actions to it.

        queue.addAction(function(){
          // Action does some stuff...
          console.log('Doing stuff...', arguments);
        }, ['arg1', 'arg2']);

        queue.addAction(function(){
          // Another action does some other stuff...
          console.log('Doing more stuff...', arguments);
        });

3. Bundle those actions up into a "step".
A step is a series of actions.

        queue.endStep();

4. Build more steps if you want. For each step you want to build, add more actions, then call `endStep()`.

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

5. Run your actions! `runNextStep()` runs the next step in the queue (which means each action in that step will execute in order). 

        queue.runNextStep();

        // The following new content is displayed in the console at this point:
        //  Doing stuff... { '0': 'arg1', '1': 'arg2' }
        //  Doing more stuff... {}

6. If you call `wait()`, any subsequent calls to `runNextStep()` do nothing. 

        queue.wait();

7. If you call `onComplete()` and pass in a callback, it will be called when `complete()` is called or when `runNextStep()` finishes running all the next step's actions.

        queue.onComplete(function(){
          console.log("Complete event triggered!");
        });

8. Since we're waiting now, this call has no effect.

        queue.runNextStep();

9. Stop waiting!

        queue.complete();

        // The following new content is displayed in the console at this point:
        //  Complete event triggered!

        queue.runNextStep();

        // The following new content is displayed in the console at this point:
        //  Doing next step stuff... {}
        //  Complete event triggered!

        queue.runNextStep();

        // The following new content is displayed in the console at this point:
        //  Step 3 stuff... {}
        //  Complete event triggered!

All our steps have been run and flushed out of the queue at this point.


