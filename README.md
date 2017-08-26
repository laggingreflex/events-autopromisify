# events-autopromisify

Automatically promisifies all instance of [`EventEmitter`]'s `.once()` methods

Only promisifies `.once()` methods (and not `.on()`), as promises resolve only once.

https://nodejs.org/api/events.html

## Install

```
npm i events-autopromisify
```

## Usage

Just require it once before your main code

```js
require('events-autopromisify')  // that's it
```

All subsequent EventEmitter instances will be automatically promisified

```js
const {spawn} = require('child_process')

spawn(['cmd'])
  .on('stdout', () => { /* callbacks for .on() */ })
  .once('exit') // promises for .once()
  .then(...)
```

Watchout for `'error'` events as they'll resolve by default, not reject.
```js
const cp = spawn(['cmd']);

Promise.race([
  cp.once('exit'),
  cp.once('error').then(e => {throw e}),
])
.then(...).catch(...)
```
