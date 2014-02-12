var fs            = require('fs'),
    classextends  = require('./classextends'),
    EventEmitter  = require('./EventEmitter'),
    Dialog        = require('./Dialog')
    

module.exports = Confirmation

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

classextends(Confirmation, Dialog)

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

Confirmation.prototype.$ = function(what) {
  if(this.$el) {
    return this.$el.find(what)
  }
}

Confirmation.prototype.cancel = function(options) {
  var self, callback, title
  if(typeof options === 'function') {
    title = 'cancel'
    callback = options
  } else {
    title = options.title || 'cancel'
    callback = options.callback || null
  }
  self = this
  this.$el.find('button.cancel').text(title)
  this.on('cancel', function() {
    if(typeof callback === 'function') {
      callback.call(self) 
    }
  })
  return this
}

Confirmation.prototype.ok = function(options) {
  var self, callback, title
  if(typeof options === 'function') {
    title = 'ok'
    callback = options
  } else {
    title = options.title || 'ok'
    callback = options.callback || null
  }
  self = this
  this.$el.find('button.ok').text(title)
  this.on('ok', function() {
    if(typeof callback === 'function') {
      callback.call(self) 
    }
  })
  return this
}