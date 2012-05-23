
var Event = require(__dirname + '/../lib/Event')

describe('Event', function( ) {

  it('Should have 2 handlers after calling addHandler twice', function(){
    var event
    event = new Event()
    event.addHandler(function(){})
    event.addHandler(function(){})
    expect(event.handlers.length).toEqual(2)
  })

  it('Should have 0 handlers after calling addHandler and removeHandler with same function as parameter', function(){
    var event,
        fn;
    event = new Event()
    fn = function(){}
    event.addHandler(fn)
    event.removeHandler(fn)
    expect(event.handlers.length).toEqual(0)
  })

  it('Should increment var i to 2 when 2 increment events are bound to do so', function(){
    var i,
        event;
    i = 0;
    event = new Event()
    event.addHandler(function(){ i++ })
    event.addHandler(function(){ i++ })
    event.fire()
    expect(i).toEqual(2)
  })

})