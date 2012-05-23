define([

  'lib/classextends',
  'lib/EventEmitter',
  'lib/text!lib/Dialog/template.html'

], function(classextends, EventEmitter, template) {

  var Dialog, nrOfVisibleDialogs

  nrOfVisibleDialogs = 0

  Dialog = (function() {
    
    classextends(Dialog, EventEmitter)

    function Dialog(options){
      Dialog.__super__.constructor.apply(this, arguments)
      this.options = Dialog.defaults
      if(typeof options === 'string') {
        this.options.message = options
      } else if(typeof options === 'object') {
        for(var key in options) {
          this.options[key] = options[key]
        } 
      }
      return this.render()
    }

    Dialog.template = template

    Dialog.defaults = {
      title: null,
      message: 'Dialog message',
      closable: true,
      effect: 'scale'
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
      if(!this.$el) {
        this.render()
      }
      this.emit('show')
      this.$el.appendTo('body')

      this.$el.css({
        top: ($(window).height() / 2) - (this.$el.outerHeight() / 2) - (nrOfVisibleDialogs * 3),
        left: ($(window).width() / 2) - (this.$el.outerWidth() / 2)
      })
      setTimeout(function() {
        self.$el.removeClass('hidden')
      },0)
      nrOfVisibleDialogs++
      return this
    }

    Dialog.prototype.hide = function() {
      var self
      self = this
      if(this.options.effect) { 
        self.$el.addClass('hidden')
        //TODO! transition end
        setTimeout(function() {
          self.$el.remove()
          self.$el = null
        },500)
      } else {
          self.$el.remove()
          self.$el = null
      }
      nrOfVisibleDialogs--
      return this
    }
    
    return Dialog
  })()

  return Dialog
})

