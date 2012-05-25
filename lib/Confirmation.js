define([

  'wtwui/lib/classextends',
  'wtwui/lib/EventEmitter',
  'wtwui/lib/Dialog'

], function(classextends, EventEmitter, Dialog){
  
  var Confirmation;
  
  Confirmation = (function(){

    classextends(Confirmation, Dialog)

    function Confirmation(options){
      var self
      Confirmation.__super__.constructor.call(this, options)
      self = this
      this.on('cancel', this.hide)
      this.on('ok', this.hide)
      if(this.options.ok) {
        this.ok(this.options.ok)
      }
      if(this.options.cancel) {
        this.cancel(this.options.cancel)
      }
      return this
    }
    
    Confirmation.prototype.render = function() {
      var self, cancel, ok
      Confirmation.__super__.render.apply(this, arguments)
      self = this
      cancel = $("<button class='button cancel'>Cancel</button>")
      ok = $("<button class='button ok'>Ok</button>")
      cancel.bind('click', function() {
        self.emit('cancel')
      })
      ok.bind('click', function() {
        self.emit('ok')
      })
      this.$el.find('.close').bind('click', function() {
        self.emit('cancel')
      })
      this.$el.find('div.buttons')
        .append(cancel)
        .append(ok)
      return this
    }

    Confirmation.prototype.cancel = function(callback) {
      var self
      self = this
      this.on('cancel', function() {
        callback.call(self)
      })
      return this
    }

    Confirmation.prototype.ok = function(callback) {
      var self
      self = this
      this.on('ok', function() {
        callback.call(self)
      })
      return this
    }

    return Confirmation
  })()

  return Confirmation
})