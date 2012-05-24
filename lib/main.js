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
    var title, message, callback
    if(arguments.length === 1) {
      callback = arguments[0]
    }
    if(arguments.length === 2) {
      message = arguments[0]
      callback = arguments[1]
    }
    if(arguments.length === 3) {
      title = arguments[0]
      message = arguments[1]
      callback = arguments[2]
    }
    var confirmation = new Confirmation({
      title: title || null,
      message: message || 'Are you sure?',
      ok: function() {
        callback.call(this, true)
      },
      cancel: function() {
        callback.call(this, false)
      }
    })
    confirmation.show()
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