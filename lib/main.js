
require.config({
  packages: [
    'wtwui/lib/UiElement',
    'wtwui/lib/Dialog',
    'wtwui/lib/Confirmation',
    'wtwui/lib/Overlay',
    'wtwui/lib/Tip'
  ]
})

define([

  'wtwui/lib/Dialog',
  'wtwui/lib/Confirmation',
  'wtwui/lib/Overlay',
  'wtwui/lib/Tip'

],function(Dialog, Confirmation, Overlay, Tip) {
  
  return {

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

    overlay: function() {
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
    },

    Tip: Tip,

    tip: function() {
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

  }
  
})