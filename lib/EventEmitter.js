var Event = require('./Event')


module.exports = EventEmitter

function EventEmitter() { 
  this.eventRegister = { }
}

EventEmitter.prototype.event = function(key) {
  var event, 
      key
  if(key instanceof Array || typeof key == 'object' && key.length) {
    key = key.join('.')
  } else if(key.length === 0) {
    throw new Error('EventEmitter.prototype.event received empty key argument')
  }
  key = key.toLowerCase();
  if(this.eventRegister[key]){
    event = this.eventRegister[key]
  } 
  else {
    event = new Event(this, key) 
    this.eventRegister[key] = event
  }
  return event;
}

EventEmitter.prototype.emit = function(key) {
  var event, 
      args, 
      slice, 
      key
  if(key instanceof Array || typeof key == 'object' && key.length) {
    key = key.join('')
  }
  key = key.toLowerCase() 
  slice = Array.prototype.slice;
  event = this.eventRegister[key]
  args = []
  if(arguments.length > 1) {
    args = slice.call(arguments, 1)
  }
  if(event) {
    setTimeout(function() {
      event.fire.apply(event, args)
    },0)
  } 
  return this
}

EventEmitter.prototype.on = function(key, handler) {
  var event
  event = this.event(key)
  event.addHandler(handler)
  return this
}

EventEmitter.prototype.off = function(key, handler) {
  return this.removeAllEventListeners.apply(this, arguments)
}

EventEmitter.prototype.addEventListener = function(key, handler) {
  return this.on.apply(this, arguments)
}

EventEmitter.prototype.removeEventListener = function(key, handler) {
  var event, 
      key;
  key = key.toLowerCase()
  event = this.event(key)
  event.removeHandler(handler);
  return this;
}

EventEmitter.prototype.removeAllEventListeners = function(key) {
  var key
  key = key.toLowerCase()
  if(this.eventRegister[key]){
    delete this.eventRegister[key]
  } 
  return this
}

EventEmitter.prototype.once = function(key, handler) {
  var event
  event = this.event(key)
  function fireOnce() {
    handler()
    setTimeout(function() {
      event.removeHandler(fireOnce)
    },0)
  }
  event.addHandler(fireOnce)
  return this 
}