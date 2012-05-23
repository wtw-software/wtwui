define([
  
  'lib/Dialog/main',
  'lib/Confirmation/main'

], function(Dialog, conf) {

  return {
    Dialog: Dialog,
    Confirmation: conf.Confirmation,
    confirm: conf.confirm
  }
  
})