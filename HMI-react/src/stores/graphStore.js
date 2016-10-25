/**
 * Created by Lukáš on 6/6/2016.
 */
var graphConstants = require('../constants/graphConstants');
var GraphDispatcher = require('../dispatcher/Dispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  qm_dec : {
    "a1": 10, "a2": 5, "a3": 3, "a4": 4, "a5": 5, "a6": 6, "b1": 11, "b2": 12, "b3": 13, "b4": 14,
    "b5": 15, "b6": 16, "c1": 21, "c2": 22, "c3": 23, "c4": 24, "c5": 25, "c6": 26, "d1": 31, "d2": 32,
    "d3": 33, "d4": 34, "d5": 35, "d6": 36, "e1": 41, "e2": 42, "e3": 43, "e4": 44, "e5": 45, "e6": 46,
    "f": 51, "g": 52, "h": 53, "i1": 61, "i2": 62, "j1": 63, "j2": 64, "k1": 65, "k2": 66
  },
  qm_rem : {
    "a1": 10, "a2": 5, "a3": 2, "a4": 3, "a5": 4, "a6": 5, "b1": 10, "b2": 11, "b3": 12, "b4": 13,
    "b5": 14, "b6": 15, "c1": 16, "c2": 17, "c3": 18, "c4": 19, "c5": 20, "c6": 21, "d1": 22, "d2": "23",
    "d3": 24, "d4": 25, "d5": 26, "d6": 27, "e1": 28, "e2": 29, "e3": 30, "e4": 31, "e5": 32,  "e6": 33,
    "f": 34, "g": 35, "h": 36, "i1": 37, "i2": 38, "j1": 39, "j2": 40, "k1": 41, "k2": 42
  },
  graphValues: {
    machine:{
      "na":0,"s1a":0,"s2a":0,"s3a":0,"s4a":0,"l1a":0,"l2a":0,"l3a":0,"t1a":0,"t2a":0,"t3a":0
    },
    rotation:{
      "nb":0,"s1b":0,"s2b":0,"s3b":0,"s4b":0,"l1b":0,"l2b":0,"l3b":0,"t1b":0,"t2b":0,"t3b":0
    }
  }
};

var setQMDec = function(list){
  _store.qm_dec = list;
};

var setQMRem = function(list){
  _store.qm_rem = list;
};

var setGraphValues = function(list){
  _store.graphValues = list;
};

var graphStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getQmDec: function(){
    return _store.qm_dec;
  },
  getQmRem: function(){
    return _store.qm_rem;
  },
  getGraphValue: function(){
    return _store.graphValues;
  }

});

GraphDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case graphConstants.REFRESH_ITEM:
      setQMDec(action.data.qm_detected);
      setQMRem(action.data.qm_removed);
      graphStore.emit(CHANGE_EVENT);
      break;
    case graphConstants.CHANGE_VALUES:
      setGraphValues(action.data);
      graphStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = graphStore;
