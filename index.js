const EventEmitter = require('events');

[
  // 'on', // Probably be a good idea to only use with "once" as promises only resolve once
  'once'
].forEach(m => {
  const fn = EventEmitter.prototype[m];
  EventEmitter.prototype[m] = function(msg, cb) {
    if (cb) {
      return fn.call(this, msg, cb);
    } else {
      return new Promise(cb => fn.call(this, msg, cb) );
    }
  }
});
