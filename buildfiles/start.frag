;(function(context) {

if(!context.require && !context.define) {
  
  var modules = {}

  function define(name, deps, definition){
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

  function require(deps, fn){
    var dependencies = []
    for(var i = 0; i < deps.length; i++) {
      dependencies.push(modules[deps[i]])
    }
    fn.apply({}, dependencies)
  }

  require.config = function(){}
}