require(
  {
    packages: [
      'lib/Dialog',
      'lib/Confirmation',
      'lib/Overlay',
      'lib/Tip'
    ]
  },
  [
    'lib/Dialog',
    'lib/Confirmation',
    'lib/Overlay',
    'lib/Tip'
  ],

function(Dialog, Confirmation, Overlay, Tip) {
  
  window.wtwui = {

    Dialog: Dialog,

    dialog: function() {
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
    },

    Confirmation: Confirmation,

    confirm: function() {
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
    },

    Overlay: Overlay,

    Tip: Tip,

    tip: function() {
      var options
      if(typeof arguments[0] === 'object') {
        options = arguments[0]
      } else if(typeof arguments[0] === 'string' || arguments[0] instanceof $) {
        options = {
          content: arguments[0]
        }
        if(typeof arguments[1] === 'string') {
          options.position = arguments[1]
        }
      }
      var tip = new Tip(options)
      if(tip.$target) {
        tip.show()
      }
      return tip
    }

  }
  
})