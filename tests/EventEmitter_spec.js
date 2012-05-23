
var EventEmitter = require(__dirname + '/../lib/EventEmitter'),
    Event = require(__dirname + '/../lib/Event')

describe('EventEmitter', function() {
  
  var eventEmitter

  beforeEach(function() {
    eventEmitter = new EventEmitter();
  })

  describe('EventEmitter.prototype.event', function() {
    
    it('Should return a new Event instance if the key doesnt exist in the eventEmitters eventRegister', function() {
      var event
      expect(eventEmitter.eventRegister['eventkey']).toBeFalsy()
      event  = eventEmitter.event('eventkey')
      expect(eventEmitter.eventRegister['eventkey']).toBeTruthy()
      expect(event instanceof Event).toBeTruthy()
    })

    it('Should return the event instance in the eventEmitter.eventRegister if it exists', function() {
      var event
      event = eventEmitter.event('eventkey')
      expect(eventEmitter.eventRegister['eventkey']).toBeTruthy()
      expect(eventEmitter.event('eventkey') === event).toEqual(true)
    })

    it('Should not be case sensitive, convert event keys to lowercase', function() {
      var event
      event = eventEmitter.event('EVENTKey')
      expect(eventEmitter.eventRegister['eventkey']).toBeTruthy()
      expect(eventEmitter.event('eventkey') === event).toEqual(true)
    })

  })

  describe('EventEmitter.prototype.on, EventEmitter.prototype.addEventListener', function() {
    
    it('Should add and or retrieve event from eventemitters eventRegister and add a handler to it', function() {
      function handlerOne() {}
      function handlerTwo() {}
      eventEmitter.on('keyone', handlerOne)
      eventEmitter.on('keytwo', handlerTwo)
      expect(eventEmitter.event('keyone').handlers.length).toEqual(1)
      expect(eventEmitter.event('keytwo').handlers.length).toEqual(1)
      expect(eventEmitter.event('keyone').handlers[0]).toEqual(handlerOne)
      expect(eventEmitter.event('keytwo').handlers[0]).toEqual(handlerTwo)
      eventEmitter.on('keyOne', handlerTwo)
      eventEmitter.on('keyTwo', handlerOne)
      expect(eventEmitter.event('keyone').handlers.length).toEqual(2)
      expect(eventEmitter.event('keytwo').handlers.length).toEqual(2)
      expect(eventEmitter.event('keyone').handlers[1]).toEqual(handlerTwo)
      expect(eventEmitter.event('keytwo').handlers[1]).toEqual(handlerOne)
    })

  })

  describe('EventEmitter.prototype.emit', function() {
    
    it('Should fire all handlers on the event instance found in the eventEmitters eventRegister on a given key', function() {
      runs(function() {
        this.testData = {}
        var self = this
        function handlerOne() {
          self.testData['handlerOneFired'] = true
        }
        function handlerTwo() {
          self.testData['handlerTwoFired'] = true
        }
        eventEmitter.on('keyOne', handlerOne)
        eventEmitter.on('keyTwo', handlerTwo)
        expect(self.testData['handlerOneFired']).toBeFalsy()
        expect(self.testData['handlerTwoFired']).toBeFalsy()
        eventEmitter.emit('keyone')
        eventEmitter.emit('keytwo')
      })
      waits(1)
      runs(function() {
        expect(this.testData['handlerOneFired']).toBeTruthy()
        expect(this.testData['handlerTwoFired']).toBeTruthy()
      })
    })

    it('Should pass arguments splat after key arguments as arguments to the event handler', function() {
      runs(function() {
        this.testData = {}
        var self = this
        function handlerOne(foo, bar) {
          self.testData['handlerOne'] = {}
          self.testData['handlerOne'][foo] = true
          self.testData['handlerOne'][bar] = true
        }
        function handlerTwo(foo, bar) {
          self.testData['handlerTwo'] = {}
          self.testData['handlerTwo'][foo] = true
          self.testData['handlerTwo'][bar] = true
        }
        eventEmitter.on('keyOne', handlerOne)
        eventEmitter.on('keyTwo', handlerTwo)
        expect(self.testData['handlerOne']).toBeFalsy()
        expect(self.testData['handlerTwo']).toBeFalsy()
        eventEmitter.emit('keyone', 'lorem', 'lipsum')
        eventEmitter.emit('keytwo', 'lol', 'copter')
      })
      waits(1)
      runs(function() {
        expect(this.testData['handlerOne']).toBeTruthy()
        expect(this.testData['handlerOne']['lorem']).toBeTruthy()
        expect(this.testData['handlerOne']['lipsum']).toBeTruthy()
        expect(this.testData['handlerTwo']).toBeTruthy()
        expect(this.testData['handlerTwo']['lol']).toBeTruthy()
        expect(this.testData['handlerTwo']['copter']).toBeTruthy()
      })
    })

    it('Should be asynchronous and non blocking, putting the event handler on the eventque rather than firing instantaneously', function() {
      runs(function() {
        var self
        self = this
        self.i = 0
        eventEmitter.on('increment', function() {
          self.i++
        })
        eventEmitter.emit('increment')
        eventEmitter.emit('increment')
        expect(self.i).toEqual(0)
      })
      waits(5)
      runs(function() {
        expect(this.i).toEqual(2)
      })
    })

  })

  describe('EventEmitter.prototype.removeEventListener', function() {
    
    it('Should remove a specified handler from the eventEmitters eventRegister', function() {
      function handler() {}
      eventEmitter.on('eventkey', handler)
      expect(eventEmitter.event('eventkey').handlers[0]).toEqual(handler)
      eventEmitter.removeEventListener('eventkey', handler)
      expect(eventEmitter.event('eventkey').handlers[0]).toBeFalsy()
    })

  })

  describe('EventEmitter.prototype.removeAllEventListeners', function() {
    
    it('Should delete the event completely from the eventEmitters eventRegister on the specified key', function() {
      eventEmitter.on('eventkey', function() {})
      eventEmitter.on('eventkey', function() {})
      eventEmitter.on('eventkey', function() {})
      expect(eventEmitter.eventRegister['eventkey']).toBeTruthy()
      expect(eventEmitter.event('eventkey').handlers.length).toEqual(3)
      eventEmitter.removeAllEventListeners('eventkey')
      expect(eventEmitter.eventRegister['eventkey']).toBeFalsy()
    })

  })

})
