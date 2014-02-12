
var Dialog        = require('./lib/Dialog'),
    Confirmation  = require('./lib/Confirmation'),
    Overlay       = require('./lib/Overlay'),
    Tip           = require('./lib/Tip')


/*
 * Dialog
 * @api public
*/
module.exports.Dialog = Dialog

/*
 * Confirmation
 * @api public
*/
module.exports.Confirmation = Confirmation

/*
 * Overlay
 * @api public
*/
module.exports.Overlay = Overlay

/*
 * Tip
 * @api public
*/
module.exports.Tip = Tip


/*
 * Shorthand for using Dialog
 * @api public
*/
module.exports.dialog = function dialog() {
  var dialog, options
  if(typeof arguments[0] === 'object') {
    options = arguments[0]
  } else {
    options = {}
    if(arguments.length === 1) {
      options.message = arguments[0]
    }
    if(arguments.length === 2) {
      options.title = arguments[0]
      options.message = arguments[1]
    } 
  }
  var dialog = new Dialog(options)
  dialog.show()
  return dialog
}

/*
 * Shorthand for using Comfirmation
 * @api public
*/
module.exports.confirm = function confirm() {
  var self, title, message, callback
  self = this
  if(typeof arguments[arguments.length - 1] === 'function') {
    callback = arguments[arguments.length - 1]
  }
  if(arguments.length === 2 && callback) {
    if(typeof arguments[0] === 'string') {
      message = arguments[0]
    }
  } else if(arguments.length > 2) {
    title = arguments[0]
    message = arguments[1]
  } else if(arguments.length === 3) {
    
  }
  var confirmation = new Confirmation({
    title: title || null,
    message: message || 'Are you sure?'
  })
  if(callback) {
    confirmation.ok(function() {
      callback.call(self, true)
    })
    confirmation.cancel(function() {
      callback.call(self, false)
    })
  }
  confirmation.show()
  return confirmation
}

/*
 * Shorthand for using Overlay
 * @api public
*/
module.exports.overlay = function overlay() {
  var options, overlay
  options = {}
  if(arguments.length === 1) {
    if(typeof arguments[0] === 'string' || arguments[0] instanceof $) {
      options.content = arguments[0]
    } else if(typeof arguments[0] === 'object') {
      options = arguments[0]
    } else if(arguments[0].$el && arguments[0].$el instanceof $) {
      options.content = arguments[0].$el
    }
  }
  overlay = new Overlay(options)
  overlay.show()
  return overlay
}

/*
 * Shorthand for Tip
 * @api public
*/
module.exports.tip = function tip() {
  var options
  if(typeof arguments[0] === 'object') {
    options = arguments[0]
  } else if(typeof arguments[0] === 'string' || arguments[0] instanceof $) {
    options = {
      target: arguments[0]
    }
    if(typeof arguments[1] === 'string') {
      options.content = arguments[1]
    }
    if(typeof arguments[2] === 'string') {
      options.position = arguments[2]
    }
  }
  var tip = new Tip(options)
  tip.visible = true
  setTimeout(function() {
    if(tip.$target && tip.visible) {
      tip.show()
    }
  },0)
  return tip
}