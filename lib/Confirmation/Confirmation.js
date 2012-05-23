define([

  '../classextends',
  '../EventEmitter',
  '../Dialog/main'

], function(classextends, EventEmitter, Dialog){
  
  var Confirmation;
  
  Confirmation = (function(){

    classextends(Confirmation, Dialog)

    function Confirmation(options){
      Confirmation.__super__.constructor.call(this, options)
      return this
    }
    
    Confirmation.prototype.render = function() {
      Confirmation.__super__.render.apply(this, arguments)
      if(this.options.ok) {
        this.ok(this.options.ok)
      }
      if(this.options.cancel) {
        this.cancel(this.options.cancel)
      } else {
        this.cancel()
      }
      return this
    }

    Confirmation.prototype.cancel = function(callback) {
      var self, cancelButton
      self = this
      if(this.$el.find('.buttons .cancel').length > 0) {
        cancelButton = this.$el.find('.buttons .cancel')
      } else {
        cancelButton = $("<button class='button cancel'>Cancel</button>") 
        this.$el.find('div.buttons').append(cancelButton)
      }
      cancelButton.bind('click', function() {
        if(typeof callback === 'function') {
          callback.call(self) 
        }
        self.off('hide')
        self.hide()
      })
      this.on('hide', function() {
        if(typeof callback === 'function') {
          callback.call(self) 
        }
      })
      return this
    }

    Confirmation.prototype.ok = function(callback) {
      var self, okButton
      self = this
      if(this.$el.find('.buttons .ok').length > 0) {
        okButton = this.$el.find('.buttons .ok')
      } else {
        okButton = $("<button class='button ok'>Ok</button>")
        this.$el.find('div.buttons').prepend(okButton)
      }
      okButton.bind('click', function() {
        callback.call(self)
        self.off('hide')
        self.hide()
      })
      return this
    }

    return Confirmation
  })()

  return Confirmation
})