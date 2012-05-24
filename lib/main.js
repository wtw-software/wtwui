define([
  
  'lib/Dialog/Dialog',
  'lib/Confirmation/Confirmation',
  'lib/Overlay/Overlay'

], function(Dialog, Confirmation, Overlay) {

  function dialog() {
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

  function confirm() {
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
    return confirmation
  }

  return {
    Dialog: Dialog,
    dialog: dialog,
    Confirmation: Confirmation,
    confirm: confirm,
    Overlay: Overlay
  }
  
})