
define([

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
  })() */