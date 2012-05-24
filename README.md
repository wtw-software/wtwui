
# wtwui

## wtwui.Dialog
Creating a dialog box can be done using one of two patterns. Dialog class instantiation or functional invocation.

#### Creating a Dialog instance  

```javascript
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

dialog.hide()
```

##### Chaining

```javascript
new wtwui.Dialog({
  title: 'title of the dialog',
  message: 'lol noob'
})
.show()
.on('hide', dialogHidden)
```

#### dialog shorthand
This function created a new wtwui.Dialog instance and imediatly shows it.

```javascript
wtwui.dialog('title', 'message')
wtwui.dialog('just a message')
wtwui.dialog({
  title: 'title text',
  message: 'using options like a boss'
})
```

The function allso returns an instance of wtwui.Dialog so that it can be further manipulated.

```javascript
var dialog = wtwui.dialog('title', 'message')

dialog.on('hide', function(){
  console.log('user closed the dialog')
})
```

## wtwui.Confirmation
Confirmation boxes are dialogs that gived the user two options: ok or cancel. You can pass most of the same parameters as with dialogs.

#### Creating a Confimation instance
```javascript
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

// or

var confirmation = new wtwui.Confirmation({
  title: 'Remove user',
  message: 'Are you sure?'
})

confirmation.ok(function() {
  user.delete()
})

confirmation.cancel(function() {
  user.rollBack()
})

confirmation.show()
```

#### confirm shorthand
By using the shorthand the confirmation is shown immediately

```javascript
wtwui.confirm('Delete user', 'Are you sure', function(ok){
  if(ok)
    user.dete()
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
```

## wtwui.Overlay
An overlay covers the whole of the user view with a transparent box that you can place some content in. It can allso be used with the dialog of confirmation classes.

```javascript
var overlay = new wtwui.Overlay()
overlay.show()

// or

new wtwui.Overlay({
  css: {
    background: 'red'
  }
}).show()
```

#### With dialog or confirmation

```javascript
new wtwui.Dialog({
  title: 'Thats right',
  message: 'Dialog bitches'
})
.overlay()
.show()

new wtwui.Dialog({
  title: 'Something erroneous has happened',
  message: 'oh noes'
})
.overlay({
  css: {
    background: 'red'
  }
})
.show()
```

#### Custom content

```javascript
new wtwui.Overlay({
  content: 'it can take a string'
}).show()

new wtwui.Overlay({
  content: '<p> or html </p>'
}).show()

new wtwui.Overlay({
  content: $('<i> or even an jquery object </i>')
}).show()

// or

new wtwui.Overlay('content string, html or jquery').show()

```










