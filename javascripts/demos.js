$(document).ready(function() {
  

  $('#basic-dialog').click(function() {
    
    var dialog = new wtwui.Dialog({
      title: 'title of the dialog',
      message: 'lol noob'
    })

    dialog.on('show', function() {
      console.log('the userwas presented a dialog box');
    })

    dialog.show()

    dialog.on('hide', function() {
      console.log('user closed the dialog');
    })

  })


})