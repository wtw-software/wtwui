define([

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

    Overlay.prototype.$ = function(what) {
      if(this.$el) {
        return this.$el.find(what)
      }
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
})