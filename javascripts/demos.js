$(document).ready(function() {
  

  var user = {
    delete: function() {
      console.log('User Deleted!');
    },
    rollback: function() {
      console.log('Rollbacked userdata');
    }
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

  $('#basic-confirmation').click(function() {
    new wtwui.Confirmation({
      title: 'Remove user',
      message: 'Are you sure?',
      ok: function() {
        user.delete()
      },
      cancel: function() {
        user.rollback()
      }
    }).show()
  })


  $('#basic-confirmation-shorthand').click(function() {
    
    wtwui.confirm('Delete user', 'Are you sure', function(ok){
      if(ok)
        user.delete()
      else
        user.rollback()
    })

    // or

    wtwui.confirm('Are you sure you wwant to delete the user?', function(ok){
      if(ok)
        user.delete()
      else
        user.rollback()
    })

    wtwui.confirm('Delete user', 'are you sure')
      .ok(function(){
        user.delete()
      })
      .cancel(function(){
        user.rollback()
      })
  })



})