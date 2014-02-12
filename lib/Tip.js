var fs            = require('fs'),
    classextends  = require('./classextends'),
    EventEmitter  = require('./EventEmitter')


module.exports = Tip

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
  this.render()
  if(this.options.show) {
    this.show()
  }
  return this
}

classextends(Tip, EventEmitter)

Tip.template = fs.readFileSync(__dirname + '/templates/Tip.html')

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
  return this
}

Tip.prototype.$ = function(what) {
  if(this.$el) {
    return this.$el.find(what)
  }
}

Tip.prototype.position = function() {
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
  target = target || this.$target
  function inside() {
    self.show(target)
  }
  function outside() {
    self.hide()
  }
  this.hide()
  $(target).unbind('mouseover', inside)
  $(target).unbind('mouseout', outside)
  $(target).bind('mouseover', inside)
  $(target).bind('mouseout', outside)
  return this
}

Tip.prototype.hide = function() {
  var self
  self = this
  this.visible = false
  self.$el.addClass('hidden')
  return this
}

Tip.prototype.show = function(target) {
  var self
  self = this
  this.visible = true
  if(target) {
    this.$target = $(target)
  }
  this.position()
  setTimeout(function() {
    self.$el.removeClass('hidden')
    self.emit('show')
  },0)
  return this
}