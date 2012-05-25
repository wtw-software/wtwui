$(document).ready(function() {
  

  var user = {
    delete: function() {},
    rollback: function() {}
  }

  $('#basic-dialog').click(function() {
    
    var dialog = new wtwui.Dialog({
      title: 'Dialog yeeeeah',
      message: 'Its slick allright'
    })

    dialog.on('show', function() {
      console.log('the user was presented a dialog box');

    })

    dialog.show()

    dialog.on('hide', function() {
      console.log('user closed the dialog');
    })
  })

  $('#basic-dialog-chaining').click(function() {
    new wtwui.Dialog({
      title: 'Dialog yeeeeah',
      message: 'Its slick allright'
    })
    .show()
    .on('hide', function(){
      alert('alerts is so much better!')
    })
  })

  $('#basic-dialog-shorthand').click(function() {
    wtwui.dialog('title', 'message')
    wtwui.dialog('just a message')
    wtwui.dialog({
      title: 'title text',
      message: 'using options like a boss'
    })
  })


})