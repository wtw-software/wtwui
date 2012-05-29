;(function(context) {

if(!context.require && !context.define) {
  
  var modules = {}

  context.define = function(){
    var name, packages, deps, definition
    if(arguments.length === 3) {
      name = arguments[0]
      deps = arguments[1]
      definition = arguments[2]
    } else if(arguments.length === 4) {
      name = arguments[0]
      packages = arguments[1]
      deps = arguments[2]
      definition = arguments[3]
    }
    if(!modules[name]) {
      var dependencies = []
      if(typeof deps === 'object') {
        for(var i = 0; i < deps.length; i++) {
          dependencies.push(modules[deps[i]])
        } 
      } else if(typeof deps === 'function') {
        definition = deps
      }
      modules[name] = definition.apply({}, dependencies)
    }
  }

  context.require = function(deps, fn){
    var dependencies = []
    if(typeof deps === 'string') {
      dependencies.push(modules[deps])
    } else if(deps.length) {
      for (var i = 0; i < deps.length; i++) {
        dependencies.push(modules[deps[i]])
      }
    }
    if(typeof fn === 'function') {
      return fn.apply(context, dependencies)
    } else if(dependencies.length === 1){
      return dependencies[0]
    } else if(dependencies.length > 1) {
      var out = {}
      for (var i = 0; i < deps.length; i++) {
        out[deps[i]] = modules[deps[i]]
      }
      return out
    }
  }

  require.config = function(){}
}
define('wtwui/lib/classextends',[], function(){
  
  var __hasProp = Object.prototype.hasOwnProperty

  return function(child, parent) { 
    for (var key in parent) { 
      if (__hasProp.call(parent, key)) child[key] = parent[key]; 
    } 
    function ctor() { 
      this.constructor = child; 
    } 
    ctor.prototype = parent.prototype; 
    child.prototype = new ctor; 
    child.__super__ = parent.prototype; return child; 
  }
    
})

;
define('wtwui/lib/Event',[], function() {
  
  var Event;

  Event = (function(){
        
    function Event(context, key){
      this.key = key
      this.context = context || this
      this.handlers = []
    }
    
    Event.prototype.addHandler = function(handler) {
      if(!handler) return false
      this.handlers.push(handler)
    }

    Event.prototype.removeHandler = function(handler) {
      var i;
      for(i = this.handlers.length-1; i >= 0; i--) {
        if(this.handlers[i] === handler) {
          this.handlers.splice(i, 1)
        }
      }
    }

    Event.prototype.fire = function() {
      var i, 
          fn,
          context;
      for(i = this.handlers.length-1; i >= 0; i--) {
        fn = this.handlers[i];
        context = this.context || this
        fn.apply(this.context, arguments)
      }
    }

    return Event
  })()
  
  return Event  
})
;
define('wtwui/lib/EventEmitter',[

  'wtwui/lib/Event'

], function(Event){

  var EventEmitter

  EventEmitter = (function() {
    
    function EventEmitter() { 
      this.eventRegister = { }
    }

    EventEmitter.prototype.event = function(key) {
      var event, 
          key
      if(key instanceof Array || typeof key == 'object' && key.length) {
        key = key.join('.')
      } else if(key.length === 0) {
        throw new Error('EventEmitter.prototype.event received empty key argument')
      }
      key = key.toLowerCase();
      if(this.eventRegister[key]){
        event = this.eventRegister[key]
      } 
      else {
        event = new Event(this, key) 
        this.eventRegister[key] = event
      }
      return event;
    }

    EventEmitter.prototype.emit = function(key) {
      var event, 
          args, 
          slice, 
          key
      if(key instanceof Array || typeof key == 'object' && key.length) {
        key = key.join('')
      }
      key = key.toLowerCase() 
      slice = Array.prototype.slice;
      event = this.eventRegister[key]
      args = []
      if(arguments.length > 1) {
        args = slice.call(arguments, 1)
      }
      if(event) {
        setTimeout(function() {
          event.fire.apply(event, args)
        },0)
      } 
      return this
    }

    EventEmitter.prototype.on = function(key, handler) {
      var event
      event = this.event(key)
      event.addHandler(handler)
      return this
    }

    EventEmitter.prototype.off = function(key, handler) {
      return this.removeAllEventListeners.apply(this, arguments)
    }

    EventEmitter.prototype.addEventListener = function(key, handler) {
      return this.on.apply(this, arguments)
    }

    EventEmitter.prototype.removeEventListener = function(key, handler) {
      var event, 
          key;
      key = key.toLowerCase()
      event = this.event(key)
      event.removeHandler(handler);
      return this;
    }

    EventEmitter.prototype.removeAllEventListeners = function(key) {
      var key
      key = key.toLowerCase()
      if(this.eventRegister[key]){
        delete this.eventRegister[key]
      } 
      return this
    }

    EventEmitter.prototype.once = function(key, handler) {
      var event
      event = this.event(key)
      function fireOnce() {
        handler()
        setTimeout(function() {
          event.removeHandler(fireOnce)
        },0)
      }
      event.addHandler(fireOnce)
      return this 
    }
        
    return EventEmitter
  })()

  return EventEmitter
})
;
/*
 RequireJS text 1.0.8 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
(function(){var k=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],m=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,n=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,i=typeof location!=="undefined"&&location.href,o=i&&location.protocol&&location.protocol.replace(/\:/,""),p=i&&location.hostname,q=i&&(location.port||void 0),j=[];define('wtwui/lib/text',[],function(){var e,l;e={version:"1.0.8",strip:function(a){if(a){var a=a.replace(m,""),c=a.match(n);c&&(a=c[1])}else a="";return a},jsEscape:function(a){return a.replace(/(['\\])/g,
"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")},createXhr:function(){var a,c,b;if(typeof XMLHttpRequest!=="undefined")return new XMLHttpRequest;else if(typeof ActiveXObject!=="undefined")for(c=0;c<3;c++){b=k[c];try{a=new ActiveXObject(b)}catch(f){}if(a){k=[b];break}}return a},parseName:function(a){var c=!1,b=a.indexOf("."),f=a.substring(0,b),a=a.substring(b+1,a.length),b=a.indexOf("!");b!==-1&&(c=a.substring(b+1,a.length),
c=c==="strip",a=a.substring(0,b));return{moduleName:f,ext:a,strip:c}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(a,c,b,f){var d=e.xdRegExp.exec(a),g;if(!d)return!0;a=d[2];d=d[3];d=d.split(":");g=d[1];d=d[0];return(!a||a===c)&&(!d||d===b)&&(!g&&!d||g===f)},finishLoad:function(a,c,b,f,d){b=c?e.strip(b):b;d.isBuild&&(j[a]=b);f(b)},load:function(a,c,b,f){if(f.isBuild&&!f.inlineText)b();else{var d=e.parseName(a),g=d.moduleName+"."+d.ext,h=c.toUrl(g),r=f&&f.text&&f.text.useXhr||e.useXhr;!i||r(h,
o,p,q)?e.get(h,function(c){e.finishLoad(a,d.strip,c,b,f)}):c([g],function(a){e.finishLoad(d.moduleName+"."+d.ext,d.strip,a,b,f)})}},write:function(a,c,b){if(j.hasOwnProperty(c)){var f=e.jsEscape(j[c]);b.asModule(a+"!"+c,"define(function () { return '"+f+"';});\n")}},writeFile:function(a,c,b,f,d){var c=e.parseName(c),g=c.moduleName+"."+c.ext,h=b.toUrl(c.moduleName+"."+c.ext)+".js";e.load(g,b,function(){var b=function(a){return f(h,a)};b.asModule=function(a,b){return f.asModule(a,h,b)};e.write(a,g,
b,d)},d)}};if(e.createXhr())e.get=function(a,c){var b=e.createXhr();b.open("GET",a,!0);b.onreadystatechange=function(){b.readyState===4&&c(b.responseText)};b.send(null)};else if(typeof process!=="undefined"&&process.versions&&process.versions.node)l=require.nodeRequire("fs"),e.get=function(a,c){var b=l.readFileSync(a,"utf8");b.indexOf("\ufeff")===0&&(b=b.substring(1));c(b)};else if(typeof Packages!=="undefined")e.get=function(a,c){var b=new java.io.File(a),f=java.lang.System.getProperty("line.separator"),
b=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(b),"utf-8")),d,e,h="";try{d=new java.lang.StringBuffer;(e=b.readLine())&&e.length()&&e.charAt(0)===65279&&(e=e.substring(1));for(d.append(e);(e=b.readLine())!==null;)d.append(f),d.append(e);h=String(d.toString())}finally{b.close()}c(h)};return e})})();
define('wtwui/lib/text!wtwui/lib/templates/Dialog.html',[],function () { return '<div class="wtwui-dialog wtwui-element">\n  <h1 class="title"></h1>\n  <div class="close">×</div>\n  <div class="content"></div>\n  <div class="buttons">\n    \n  </div>\n</div>';});

define('wtwui/lib/text!wtwui/lib/templates/Overlay.html',[],function () { return '<div class="wtwui-overlay"></div>';});

define('wtwui/lib/Overlay',[

  'wtwui/lib/classextends',
  'wtwui/lib/EventEmitter',
  'wtwui/lib/text!wtwui/lib/templates/Overlay.html'

], function(classextends, EventEmitter, template){
  
  var Overlay;
  
  Overlay = (function(){
    
    classextends(Overlay, EventEmitter)

    function Overlay(options){
      Overlay.__super__.constructor.apply(this, arguments)
      this.options = Overlay.defaults()
      if(typeof options === 'object') {
        for(var key in options) {
          this.options[key] = options[key]
        } 
      }
      return this.render()
    }

    Overlay.template = template

    var defaults = {
      'effect': 'fade'
    }

    Overlay.defaults = function(options) {
      var out = {}
      if(options) {
        for(var option in options) {
          defaults[option] = options[option]
        }
      }
      for(var option in defaults) {
        out[option] = defaults[option]
      }
      return out
    }

    Overlay.isContent = function(content) {
      if(typeof content === 'string' || content instanceof $) {
        if(content.$el && content.$el instanceof $) {
          return content.$el
        }
        return content
      }
    }

    Overlay.prototype.render = function() {
      if(!this.$el) {
        this.$el = $(Overlay.template) 
      }
      this.$el.appendTo('body')
      this.$el.addClass('hidden')
      if(this.options.content) {
        this.$el.html(this.options.content)
      }
      if(this.options.effect) {
        this.$el.addClass(this.options.effect)
      }
      if(this.options.css) {
        this.$el.css(this.options.css)
      }
      if(this.options.className) {
        this.$el.addClass(this.options.className)
      }
      return this
    }

    Overlay.prototype.show = function(content) {
      var self
      self = this
      this.options.content = Overlay.isContent(content) || null
      this.render()
      this.emit('show')
      setTimeout(function() {
        self.$el.removeClass('hidden')
      },1)
      return this
    }

    Overlay.prototype.hide = function() {
      var self
      self = this
      this.$el.addClass('hidden')
      if(this.options.effect) {
        setTimeout(function() {
          self.$el.remove()
        },500)
      } else {
        this.$el.remove()
      }
      this.emit('hide')
      return this
    }
        
    return Overlay
  })()

  return Overlay
});
define('wtwui/lib/Dialog',[

  'wtwui/lib/classextends',
  'wtwui/lib/EventEmitter',
  'wtwui/lib/Overlay',
  'wtwui/lib/text!wtwui/lib/templates/Dialog.html'

], function(classextends, EventEmitter, Overlay, template) {

  var Dialog

  Dialog = (function() {
    
    classextends(Dialog, EventEmitter)

    function Dialog(options){
      Dialog.__super__.constructor.apply(this, arguments)
      this.options = Dialog.defaults()
      if(typeof options === 'string') {
        this.options.message = options
      } else if(typeof options === 'object') {
        for(var key in options) {
          this.options[key] = options[key]
        } 
      }
      return this
    }

    Dialog.nrofvisible = 0

    Dialog.template = template

    var defaults = {
      title: null,
      message: 'Dialog message',
      closable: true,
      effect: 'fade'
    }
    
    Dialog.defaults = function(options) {
      if(options) {
        for(var option in options) {
          defaults[option] = options[option]
        }
      }
      return defaults
    }
    
    Dialog.prototype.render = function() {
      var self
      self = this
      this.$el = $(Dialog.template)
      if(this.options.title) {
        this.$el.find('.title').html(this.options.title) 
      } else {
        this.$el.find('.title').remove()
      }
      this.$el.find('.content').html(this.options.message)
      if(this.options.closable) {
        this.$el.find('.close').bind('click', function() {
          self.emit('close')
          self.hide()
        }) 
      } else {
        this.$el.find('.close').remove()
      }
      if(this.options.effect) {
        this.$el.addClass(this.options.effect)
      }
      if(this.options.overlay) {
        this.overlay(this.options.overlay)
      }
      this.$el.addClass('hidden')
      if($('body').find(this.$el).length === 0) {
        this.$el.appendTo('body')
      }
      return this
    }

    Dialog.prototype.overlay = function(options) {
      if(this._overlay) {
        this._overlay.$el.remove()
      }
      this._overlay = new Overlay(options)
      this.on('hide', function() {
        this._overlay.hide()
      })
      this.$el.addClass('overlay')
      return this
    }

    Dialog.prototype.show = function() {
      var self
      self = this
      Dialog.nrofvisible++
      this.render()
      if(this._overlay) {
        this._overlay.show()
      }
      this.$el.css({
        bottom: ($(window).height() / 2) + (Dialog.nrofvisible * 3),
        left: ($(window).width() / 2) - (this.$el.outerWidth() / 2)
      })
      setTimeout(function() {
        self.$el.removeClass('hidden')
        self.emit('show')
      },0)
      return this
    }

    Dialog.prototype.hide = function() {
      var self
      self = this
      if(this.options.effect) { 
        self.$el.addClass('hidden')
        setTimeout(function() {
          self.$el.remove()
        },500)
      } else {
          self.$el.remove()
      }
      self.emit('hide')
      Dialog.nrofvisible--
      return this
    }
    
    return Dialog
  })()

  return Dialog
})

;
define('wtwui/lib/Confirmation',[

  'wtwui/lib/classextends',
  'wtwui/lib/EventEmitter',
  'wtwui/lib/Dialog'

], function(classextends, EventEmitter, Dialog){
  
  var Confirmation;
  
  Confirmation = (function(){

    classextends(Confirmation, Dialog)

    function Confirmation(options){
      var self
      Confirmation.__super__.constructor.call(this, options)
      self = this
      this.on('cancel', this.hide)
      this.on('ok', this.hide)
      if(this.options.ok) {
        this.ok(this.options.ok)
      }
      if(this.options.cancel) {
        this.cancel(this.options.cancel)
      }
      return this
    }
    
    Confirmation.prototype.render = function() {
      var self, cancel, ok
      Confirmation.__super__.render.apply(this, arguments)
      self = this
      cancel = $("<button class='button cancel'>Cancel</button>")
      ok = $("<button class='button ok'>Ok</button>")
      cancel.bind('click', function() {
        self.emit('cancel')
      })
      ok.bind('click', function() {
        self.emit('ok')
      })
      this.$el.find('.close').bind('click', function() {
        self.emit('cancel')
      })
      this.$el.find('div.buttons')
        .append(cancel)
        .append(ok)
      return this
    }

    Confirmation.prototype.cancel = function(callback) {
      var self
      self = this
      this.on('cancel', function() {
        callback.call(self)
      })
      return this
    }

    Confirmation.prototype.ok = function(callback) {
      var self
      self = this
      this.on('ok', function() {
        callback.call(self)
      })
      return this
    }

    return Confirmation
  })()

  return Confirmation
});
define('wtwui/lib/text!wtwui/lib/templates/Tip.html',[],function () { return '<div class="wtwui-tip">\n  <div class="tip"></div>\n  <div class="content"></div>\n</div>';});

define('wtwui/lib/Tip',[

  'wtwui/lib/classextends',
  'wtwui/lib/EventEmitter',
  'wtwui/lib/text!wtwui/lib/templates/Tip.html'

], function(classextends, EventEmitter, template) {

  var Tip;
  
  Tip = (function(){
    
    classextends(Tip, EventEmitter)

    function Tip(options){
      Tip.__super__.constructor.apply(this, arguments)
      this.options = Tip.defaults()
      if(typeof options === 'object') {
        for(var key in options) {
          this.options[key] = options[key]
        } 
      }
      if(options.target) {
        this.target(options.target)
      }
      if(this.$target) {
        this.render() 
      }
      if(this.options.show) {
        this.show()
      }
      return this
    }

    Tip.template = template

    var defaults = {
      position: 'north',
      effect: 'fade'
    }
    
    Tip.defaults = function(options) {
      var out = {}
      if(options) {
        for(var option in options) {
          defaults[option] = options[option]
        }
      }
      for(var option in defaults) {
        out[option] = defaults[option]
      }
      return out
    }

    Tip.prototype.render = function() {
      if(!this.$el) {
        this.$el = $(Tip.template) 
        this.$el.addClass('hidden')
      }
      if(this.options.content) {
        this.$el.find('.content').html(this.options.content)
      }
      if(this.options.target) { 
        this.$target = $(this.options.target)
      }
      if(this.options.effect) {
        this.$el.addClass(this.options.effect)
      }
      this.$el.addClass('hidden')
      this.$el.appendTo('body')
      switch(this.options.position) {
        case 'north': 
          this.positionNorth()
          break;
        case 'north-east': 
          this.positionNorthEast()
          break;
        case 'north-west': 
          this.positionNorthWest()
          break;
        case 'south': 
          this.positionSouth()
          break;
        case 'south-east': 
          this.positionSouthEast()
          break;
        case 'south-west': 
          this.positionSouthWest()
          break;
        case 'east': 
          this.positionEast()
          break;
        case 'west': 
          this.positionWest()
          break;
      }
      return this
    }

    Tip.prototype.positionNorth = function() {
      var tip = this.$el.find('.tip')
      this.$el.css({
        top: this.$target.offset().top - this.$el.outerHeight() - 7,
        left: (this.$target.offset().left + (this.$target.outerWidth() / 2)) - (this.$el.outerWidth() / 2)
      })
      tip
        .attr('class', 'tip north')
        .css({
          left: (this.$el.outerWidth() / 2) - (tip.outerWidth() / 2)
        })
      return this
    }

    Tip.prototype.positionEast = function() {
      var tip = this.$el.find('.tip')
      this.$el.css({
        left: this.$target.offset().left + this.$target.outerWidth() + 7,
        top:  (this.$target.offset().top + (this.$target.outerHeight() / 2)) - (this.$el.outerHeight() / 2)
      })
      tip
        .attr('class', 'tip east')
        .css({
          top: (this.$el.outerHeight() / 2) - (tip.outerHeight() / 2)
        })
      return this
    }

    Tip.prototype.positionWest = function() {
      var tip = this.$el.find('.tip')
      this.$el.css({
        left: this.$target.offset().left - this.$el.outerWidth() - 7,
        top:  (this.$target.offset().top + (this.$target.outerHeight() / 2)) - (this.$el.outerHeight() / 2)
      })
      tip
        .attr('class', 'tip west')
        .css({
          top: (this.$el.outerHeight() / 2) - (tip.outerHeight() / 2)
        })
      return this
    }

    Tip.prototype.positionSouth = function() {
      var tip = this.$el.find('.tip')
      this.$el.css({
        top: this.$target.offset().top + this.$target.outerHeight() + 7,
        left: (this.$target.offset().left + (this.$target.outerWidth() / 2)) - (this.$el.outerWidth() / 2)
      })
      tip
        .attr('class', 'tip south')
        .css({
          left: (this.$el.outerWidth() / 2) - (tip.outerWidth() / 2)
        })
      return this
    }

    Tip.prototype.positionNorthEast = function() {
      this.$el.find('.tip').attr('class', 'tip north east')
      this.$el.css({
        top: this.$target.offset().top - this.$el.outerHeight() - 7,
        left: (this.$target.offset().left + (this.$target.outerWidth())) - 40
      })
      return this
    }

    Tip.prototype.positionNorthWest = function() {
      this.$el.css({
        top: this.$target.offset().top - this.$el.outerHeight() - 7,
        left: (this.$target.offset().left - this.$el.outerWidth()) + 40
      })
      this.$el.find('.tip').attr('class', 'tip north west')
      return this
    }

    Tip.prototype.positionSouthEast = function() {
      this.$el.css({
        top: this.$target.offset().top + this.$target.outerHeight() + 7,
        left: (this.$target.offset().left + (this.$target.outerWidth())) - 40
      })
      this.$el.find('.tip').attr('class', 'tip south east')
      return this
    }

    Tip.prototype.positionSouthWest = function() {
      this.$el.css({
        top: this.$target.offset().top + this.$target.outerHeight() + 7,
        left: (this.$target.offset().left - this.$el.outerWidth()) + 40
      })
      this.$el.find('.tip').attr('class', 'tip south west')
      return this
    }

    Tip.prototype.target = function(target) {
      if(target) {
        this.$target = $(target)
      }
      return this
    }

    Tip.prototype.hover = function(target) {
      var self, target
      self = this
      function inside() {
        self.show(target)
      }
      function outside() {
        self.hide()
      }
      this.hide()
      target = target || this.$target
      $(target).unbind('mouseover', inside)
      $(target).unbind('mouseout', outside)
      $(target).bind('mouseover', inside)
      $(target).bind('mouseout', outside)
    }

    Tip.prototype.hide = function() {
      var self
      self = this
      this.visible = false
      self.$el.addClass('hidden')
      if(this.options.effect) {
        setTimeout(function() {
          self.$el.remove()  
        }, 200)
      } else {
        self.$el.remove()
      }
    }

    Tip.prototype.show = function(target) {
      var self
      self = this
      this.visible = true
      if(target) {
        this.$target = $(target)
      }
      this.render()
      setTimeout(function() {
        self.$el.removeClass('hidden')
        self.emit('show')
      },0)
      return this
    }

    return Tip
  })()
  
  return Tip
});
define('wtwui/lib/text!wtwui/lib/templates/damageNumber.html',[],function () { return '<div class="wtwui-damage-number"></div>';});

define('wtwui/lib/text!wtwui/lib/templates/healthBar.html',[],function () { return '<div class="wtwui-health-bar">\n  <div class="bar"></div>\n</div>';});


define('wtwui/lib/Crit',[

  'wtwui/lib/classextends',
  'wtwui/lib/EventEmitter',
  'wtwui/lib/text!wtwui/lib/templates/damageNumber.html',
  'wtwui/lib/text!wtwui/lib/templates/healthBar.html'

], function(classextends, EventEmitter, damageNumberTemplate, healthBarTemplate) {

  var Crit;
  
  Crit = (function(){
    
    classextends(Crit, EventEmitter)

    function Crit(options){
      Crit.__super__.constructor.apply(this, arguments)
      this.options = Crit.defaults()
      if(typeof options === 'string') {
        this.options.message = options
      } else if(typeof options === 'object') {
        for(var key in options) {
          this.options[key] = options[key]
        } 
      }
      if(this.options.target) {
        this.target(this.options.target)
      }
      this.health = this.options.life
      return this
    }

    Crit.damageNumberTemplate = damageNumberTemplate

    Crit.healthBarTemplate = healthBarTemplate

    var defaults = {
      life: 600,
      maxdamage: 260,
      mindamage: 160,
      critLimit: '235',
      deadText: 'Dead!'
    }

    Crit.defaults = function(options) {
      if(options) {
        for(var option in options) {
          defaults[option] = options[option]
        }
      }
      return defaults
    }

    Crit.getRandomNumber = function(min, max) {  
      return parseFloat((Math.random() * (max - min) + min).toFixed())
    }

    Crit.getRandomBoolean = function() {  
      var val = Crit.getRandomNumber(0,10)
      if(val > 5) {
        return true
      } else {
        return false
      }
    }

    Crit.prototype.renderHealthBar = function() {
      if(!this.$healthBar) {
        this.$healthBar = $(Crit.healthBarTemplate)
        this.$healthBar.css({
          top: this.$target.offset().top + this.$target.outerHeight() + 2,
          left: this.$target.offset().left,
          width: this.$target.outerWidth()
        })
        this.$healthBar.find('bar').css('width', '100%')
        this.$healthBar.appendTo('body') 
      }
      return this
    }

    Crit.prototype.removeHealthBar = function() {
      if(this.$healthBar) {
        this.$healthBar.remove()
      }
      return this
    }

    Crit.prototype.target = function(el) {
      var self
      self = this
      if(this.$target) {
        this.$target.unbind('click.crit')
      }
      this.$target = $(el)
      this.$target.css({
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none'
      })
      this.$target.bind('click.crit', function() {
        self.takeDamage()
      })
    }

    Crit.prototype.takeDamage = function(damage) {
      var self = this,
          damage = damage || Crit.getRandomNumber(this.options.mindamage, this.options.maxdamage),
          sct = $(Crit.damageNumberTemplate),
          text = damage
      this.health -= damage
      var healthPercentage = (this.health / (this.options.life / 100)) || 0
      if(healthPercentage < 0) {
        healthPercentage = 0
        text = this.options.deadText
        sct.addClass('dead')
        this.emit('dead')
        this.$target.unbind('click.crit')
        this.removeHealthBar()
      } else {
        this.renderHealthBar()
      }
      if(damage > this.options.critLimit) {
        this.emit('crit')
        sct.addClass('crit')
      } else {
        this.emit('hit')
      }
      sct.text(text)
      sct.appendTo('body')
      sct.css({
        top: this.$target.offset().top + (this.$target.outerHeight() / 2) - (sct.outerHeight() / 2),
        left: this.$target.offset().left + (this.$target.outerWidth() / 2) - (sct.outerWidth() / 2)
      })
      var skew = 0
      if(Crit.getRandomBoolean()) {
        sct.addClass('a')
        skew += Crit.getRandomNumber(1,55)
      } else {
        sct.addClass('b')
        skew -= Crit.getRandomNumber(1,55)
      }
      setTimeout(function() {
        sct.addClass('transition')
        setTimeout(function() {
          sct.css({
            top: sct.offset().top - 50,
            left: sct.offset().left + skew,
            opacity: 0.8
          })
          setTimeout(function() {
            sct.css({
              opacity: 0,
              top: sct.offset().top - 10,
            })
            setTimeout(function() {
              sct.remove()
            }, 400)
          }, 400)
        },0)
      },0)
      this.$healthBar.find('.bar').css({
        width: healthPercentage + '%'
      })
      this.$healthBar.addClass('active')
      if(this.healthBarTimer) {
        clearTimeout(this.healthBarTimer)
      }
      this.healthBarTimer = setTimeout(function() {
        self.$healthBar.removeClass('active')
      }, 2000)
      if(healthPercentage < 90 && healthPercentage > 75) {
        this.$healthBar.addClass('mild-damage')
      } 
      if(healthPercentage < 70 && healthPercentage > 35) {
        this.$healthBar.addClass('medium-damage')
      }
      if(healthPercentage < 35 && healthPercentage > 0) {
        this.$healthBar.addClass('heavy-damage')
      }
    }

    Crit.prototype.hit = function(callback) {
      this.on('hit', function() {
        callback(this.health)
      })
    }

    Crit.prototype.crit = function(callback) {
      this.on('crit', function() {
        callback(this.health)
      })
    }

    Crit.prototype.dead = function(callback) {
      this.on('dead', callback)
    }

    return Crit
  })()

  return Crit
  
})


/*function getRandomNumber(min, max) {  
    return (Math.random() * (max - min) + min).toFixed()
  }

  function getRandomBoolean() {  
    var val = getRandomNumber(0,10)
    if(val > 5) {
      return true
    } else {
      return false
    }
  }

  $('.critit').click(function() {
    var damage = getRandomNumber(1,150),
        damageNumber = $("<div class='wtwui-damage-number'>"+damage+"</div>")
        $('body').append(damageNumber)
        if(damage > 120) {
          damageNumber.addClass('crit')
        }
        damageNumber.css({
          top: $(this).offset().top + ($(this).outerHeight() / 2) - (damageNumber.outerHeight() / 2),
          left: $(this).offset().left + ($(this).outerWidth() / 2) - (damageNumber.outerWidth() / 2)
        })
      var skev
      if(getRandomBoolean()) {
        skev = -getRandomNumber(1,50)
      } else {
        skev = getRandomNumber(1,50)
      }
      damageNumber.addClass('transition')
      damageNumber.css({
        top: damageNumber.offset().top - 50,
        left: damageNumber.offset().left + skev,
        opacity: 0
      })
  })() */;
define('wtwui',[

  'wtwui/lib/Dialog',
  'wtwui/lib/Confirmation',
  'wtwui/lib/Overlay',
  'wtwui/lib/Tip',
  'wtwui/lib/Crit'
  
],function(Dialog, Confirmation, Overlay, Tip, Crit) {
  
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
    },

    Crit: Crit
  }
  
});})(this)