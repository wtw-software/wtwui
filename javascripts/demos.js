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

  $('#basic-overlay').click(function() {
    var overlay = new wtwui.Overlay({
      content: "<p style='opacity: 1; font-size: 40px; color: white; position: fixed; top: 200px; left: 45%'> Hides in 2 seconds.. </p>"
    })
    overlay.show()
    setTimeout(function() {
      overlay.hide()
    }, 2000)
  })

  $('#basic-overlay-dialog').click(function() {
    new wtwui.Dialog({
      title: 'Thats right',
      message: 'Dialog bitches'
    })
    .overlay()
    .show()
  })

  $('#basic-tip').click(function() {
    var tip = new wtwui.Tip({
      content: 'Funky fresh tried and tested',
      target: '#basic-tip',
      position: 'north-west'
    })

    tip.show()

    var tipB = new wtwui.Tip({
      content: 'Smooooooosh',
      target: '#tipster',
      position: 'south-west'
    })

    tipB.show()

    setTimeout(function() {
      tip.hide()
      tipB.hide()
    }, 3000)

  })

  var demos = [
    $('#basic-dialog'),
    $('#basic-dialog-chaining'),
    $('#basic-dialog-shorthand'),
    $('#basic-confirmation'),
    $('#basic-confirmation-shorthand'),
    $('#basic-overlay'),
    $('#basic-overlay-dialog'),
    $('#basic-tip'),
    $('#basic-tip-hover')
  ]

  var active = {
      
  }

  var el = $('#basic-dialog')
  var activeTip = null
  $(window).bind('scroll', function() {
    var poss = el.offset().top - $(window).scrollTop()
    if(poss < 320 && poss > -320 && !activeTip) {
      activeTip = new wtwui.Tip({
        content: 'demo',
        target: el,
        position: 'east',
      }).show()
    } else if(poss > 320 || poss < -320) {
      if(activeTip) {
        activeTip.hide() 
      }
      activeTip = false
    }
  })

  wtwui.tip('#basic-tip-hover', 'floaty', 'east').hover()



})