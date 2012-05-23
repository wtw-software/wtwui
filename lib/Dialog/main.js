define([

  'lib/classextends',
  'lib/EventEmitter',
  'lib/text!lib/Dialog/template.html'

], function(classextends, EventEmitter, template) {

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
      return this.render()
    }

    Dialog.nrofvisible = 0

    Dialog.template = template

    Dialog.defaults = function() { 
      return {
        title: null,
        message: 'Dialog message',
        closable: true,
        effect: 'scale'
      }
    }
    
    Dialog.prototype.render = function() {
      var self
      self = this
      this.$el = $(Dialog.template)
      this.$el.find('.title').html(this.options.title || '')
      this.$el.find('.content').html(this.options.message)
      this.$el.find('.close').bind('click', function() {
        self.emit('close')
        self.hide()
      })
      if(this.options.effect) {
        this.$el.addClass(this.options.effect)
      }
      this.$el.addClass('hidden')
      return this
    }

    Dialog.prototype.show = function() {
      var self
      self = this
      this.emit('show')
      this.$el.appendTo('body')
      this.$el.css({
        top: ($(window).height() / 2) - (this.$el.outerHeight() / 2) - (Dialog.nrofvisible * 3),
        left: ($(window).width() / 2) - (this.$el.outerWidth() / 2)
      })
      setTimeout(function() {
        self.$el.removeClass('hidden')
      },0)
      Dialog.nrofvisible++
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

