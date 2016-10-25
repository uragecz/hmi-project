/**
 * Created by urunzl on 22.7.2016.
 */
var languageConstants = require('../constants/languageConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
const content = require('../data/content.json');

var CHANGE_EVENT = 'change';

var _store = {
  data: content.filter(obj => obj.lang === 'EN')[0].page
};

var setData = function(data){
  _store.data = data;
};

var languageStore = objectAssign({}, EventEmitter.prototype, {

  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getData: function(){
    return _store.data;
  }
});


Dispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case languageConstants.SWITCH_LANGUAGE:
      setData(action.data.page);
      languageStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = languageStore;
