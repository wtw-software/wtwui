define([

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

    Dialog.prototype.$ = function(what) {
      if(this.$el) {
        return this.$el.find(what)
      }
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

