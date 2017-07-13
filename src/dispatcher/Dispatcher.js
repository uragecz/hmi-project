/**
 * Created by Lukáš on 6/6/2016.
 */
var Dispatcher = require('flux').Dispatcher;
var JustDispatcher = new Dispatcher();

  JustDispatcher.handleAction = function(action){
   this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });


  };
module.exports = JustDispatcher;

