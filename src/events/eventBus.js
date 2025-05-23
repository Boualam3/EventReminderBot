const {EventEmitter} = require('events')


// base class
class EventBus extends EventEmitter {}

module.exports = new EventBus()