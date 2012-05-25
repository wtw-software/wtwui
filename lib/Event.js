define([], function() {
  
  var Event;

  Event = (function(){
        
    function Event(context, key){
      this.key = key
      this.context = context || this
      this.handlers = []
    }
    
    Event.prototype.addHandler = function(handler) {
      if(!handler) return false
      this.handlers.push(handler)
    }

    Event.prototype.removeHandler = function(handler) {
      var i;
      for(i = this.handlers.length-1; i >= 0; i--) {
        if(this.handlers[i] === handler) {
          this.handlers.splice(i, 1)
        }
      }
    }

    Event.prototype.fire = function() {
      var i, 
          fn,
          context;
      for(i = this.handlers.length-1; i >= 0; i--) {
        fn = this.handlers[i];
        context = this.context || this
        fn.apply(this.context, arguments)
      }
    }

    return Event
  })()
  
  return Event  
})
