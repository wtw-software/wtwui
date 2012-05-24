define([

  'lib/classextends',
  'lib/EventEmitter',
  'lib/text!lib/Overlay/template.html'

], function(classextends, EventEmitter, template){
  
  var Overlay;
  
  Overlay = (function(){
    
    classextends(Overlay, EventEmitter)

    function Overlay(options){
      Overlay.__super__.constructor.apply(this, arguments)
      this.options = Overlay.defaults()
      if(typeof options === 'string' || options instanceof $) {
        this.options.content = options
      } else if(typeof options === 'object') {
        for(var key in options) {
          this.options[key] = options[key]
        } 
      }
      return this.render()
    }

    Overlay.template = template

    Overlay.defaults = function() {
      return {
        'effect': 'fade'
      }
    }

    Overlay.prototype.render = function() {
      this.$el = $(Overlay.template)
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
      if(typeof content === 'string' || content instanceof $) {
        this.options.content = content
      }
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