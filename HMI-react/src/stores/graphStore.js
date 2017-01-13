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
  channels: {
      ch1: {
          N:    {value: 10, unit: "%"},
          nmm: {value: 20, unit: "mm"}
      },
      ch2: {
          S1:   {value: 50, unit: "%"},
          s1mm: {value : 60, unit : "mm" }
      },
      ch3: {
          S2:   {value: 55, unit: "%"},
          s2mm: {value : 81, unit : "mm" }
      },
      ch4: {
          S3:   {value: 150, unit: "%"},
          s3mm: {value : 180, unit : "mm" }
      },
      ch5: {
          S4:   {value: 190, unit: "%"},
          s4mm: {value : 256, unit : "mm" }
      },
      ch6: {
          L1:   {value: 100, unit: "%"},
          l1mm: {value : 290, unit : "mm" }
      },
      ch7: {
          L2:   {value: 96, unit: "%"},
          l2mm: {value : 301, unit : "mm" }
      },
      ch8: {
          L3:   {value: 60, unit: "%"},
          l3mm: {value : 319, unit : "mm" }
      },
      ch9: {
          T1:   {value: -15, unit: "%"},
          t1mm: {value : 81, unit : "mm" }
      },
      ch10: {
          T2:   {value: -26, unit: "%"},
          t2mmm: {value : 99, unit : "mm" }
      },
      ch11: {
          T3:   {value: -29, unit: "%"},
          t3mm: {value : 569, unit : "mm" }
      },
  }
};

var setQMDec = function(list){
  _store.qm_dec = list;
};

var setQMRem = function(list){
  _store.qm_rem = list;
};

var setChannels = function(list){
  _store.channels = list;
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
  getChannels: function(){
    return _store.channels;
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
      setChannels(action.data);
      graphStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = graphStore;
