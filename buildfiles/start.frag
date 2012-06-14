;(function() {


  
  var modules = {}

  var define = function(){
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

  var require = function(deps, fn){
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

  var config = function(){}
