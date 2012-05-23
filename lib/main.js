define([
  
  'lib/Dialog/main'

], function(Dialog) {

  return {
    Dialog: Dialog,
    dialog: function() {
      return new Dialog.apply(this, arguments)
    }
  }
  
})