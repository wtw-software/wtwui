
# wtwui
Is a ui library with our most commonly used ui gadgets.

## Dependencies
At the moment you need `jquery` and `requirejs` to use the project. There could be an option to build the project without requirejs if the need arises.

## Build
To build the project you need to have `node` and `npm` installed.  

Then run:

```
$ npm run-script build
```

The built files `wtwui-min.js` and `wtwui.css` will be located in the main wtwui folder.

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


## wtwui.Confirmation
Confirmation boxes are dialogs that gives the user two options: ok or cancel. You can pass most of the same parameters as with dialogs.

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
By using the shorthand the confirmation is shown immediately, the function return an instance of wtwui.Confirmation

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
Overlay can be chained or passed as option into a dialog or confirmation box.

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

new wtwui.Dialog({
  title: 'lol',
  message: 'haha',
  overlay: true
}).show()

new wtwui.Dialog({
  title: 'Something erroneous has happened',
  message: 'oh noes',
  overlay: {
    css: {
      background: 'red'
    }
  }
}).show()

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

```

## wtwui.Tip
Basic vanilla flavoured tooltip.

```javascript
var tip = new wtwui.Tip({
  content: 'tooltip orama',
  target: '#tip-target'
})

tip.show()
```

#### Hover
You can make the tooltip trigger on hover. The hover target defaults to the target assigned to tooltip. Or you can designate a custom target.

```javascript
var tip = new wtwui.Tip({
  content: 'tooltip orama',
  target: '#tip-target'
})

tip.hover()
//or
tip.hover('#another-target')
```

#### Shorthand
The shorthand creates a tooltip and show it imediatly, the function return the wtwui.Tip instance.

```javascript
var tip = wtwui.tip('#tip-target', 'tooltip boii')
setTimeout(function(){
  tip.hide()
}, 1000)

//with hover
wtwui.tip('#tip-target', 'tooltip boii').hover()
wtwui.tip('#tip-target', 'tooltip boii').hover('#another-target')
```




## License
wtwui uses the MIT license
```
Copyright (C) <2012> <WTW software AS>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```









