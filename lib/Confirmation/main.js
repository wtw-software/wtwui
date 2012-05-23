define([

  './Confirmation'

], function(Confirmation){

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
    Confirmation: Confirmation,
    confirm: confirm
  }

})