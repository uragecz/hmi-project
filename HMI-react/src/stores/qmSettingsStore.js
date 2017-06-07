/**
 * Created by Lukáš on 6/6/2016.
 */
var settingsConstants = require('../constants/settingsConstants');
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
      "N": {
          dev:    {value: 10, unit: "%"},
          len:    {value: 20, unit: "mm"},
          enable: true
      },
      "S1": {
          dev:    {value: 50, unit: "%"},
          len:    {value: 60, unit: "mm"},
          enable: true
      },
      "S2": {
          dev:    {value: 55, unit: "%"},
          len:    {value: 81, unit: "mm"},
          enable: true
      },
      "S3": {
          dev:    {value: 150, unit: "%"},
          len:    {value: 180, unit: "mm"},
          enable: true
      },
      "S4": {
          dev:    {value: 190, unit: "%"},
          len:    {value: 256, unit: "mm"},
          enable: true
      },
      "L1": {
          dev:    {value: 100, unit: "%"},
          len:    {value : 290, unit : "mm"},
          enable: true
      },
      "L2": {
          dev:    {value: 96, unit: "%"},
          len:    {value: 301, unit: "mm"},
          enable: true
      },
      "L3": {
          dev:    {value: 60, unit: "%"},
          len:    {value: 319, unit : "mm"},
          enable: true
      },
      "T1": {
          dev:    {value: -15, unit: "%"},
          len:    {value: 81, unit: "mm"},
          enable: true
      },
      "T2": {
          dev:    {value: -26, unit: "%"},
          len:    {value: 99, unit: "mm"},
          enable: true
      },
      "T3": {
          dev:    {value: -29, unit: "%"},
          len:    {value: 569, unit: "mm"},
          enable: true
      }
  },
  q_alarms: {
      "CVopt-A":      {value: 0, unit: "%", enable: true},
      "IPI neps-A":   {value: 0, unit: "%", enable: true},
      "IPI thick-A":  {value: 0, unit: "%", enable: true},
      "IPI thin-A":   {value: 0, unit: "%", enable: true}
  },
  y_alarms: {
      "A-NSLT": {
          count:    {value: 0, unit: ""},
          len:      {value: 0, unit: ""},
          enable:   true
      },
      "A-SL":{
          count:    {value: 0, unit: ""},
          len:      {value: 0, unit: ""},
          enable:   true
      },
      "A-MO":{
          count:    {value: 0, unit: ""},
          len:      {value: 0, unit: ""},
          enable:   true
      }
  },
  tech_alarms: {
      "Ref-A":      {value: 0, unit: "", enable: true}
  },
  sl_c_mo_settings: {
      "SL+": {
          dev:      {value: 0, unit: "%"},
          len:      {value: 0, unit: "m"},
          enable:   true
      },
      "SL-": {
          dev:      {value: 0, unit: "%"},
          len:      {value: 0, unit: "m"},
          enable:   true
      },
      "C+": {
          dev:      {value: 0, unit: "%"},
          len:      {value: 0, unit: "m"},
          enable:   true
      },
      "C-": {
          dev:      {value: 0, unit: "%"},
          len:      {value: 0, unit: "m"},
          enable:   true
      },
      "MO": {
          dev:      {value: 0, unit: "%"},
          len:      {value: 0, unit: "m"},
          enable:   true
      },
  },
  piecer: {
      "P+": {value: -50, unit: "%", enable: true},
      "P-": {value: -20, unit: "%", enable: true}
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
var setSLCMOsettings = function (list) {
    _store.sl_c_mo_settings = list;
};
var setPiecer = function (list) {
    _store.piecer = list;
};
var setYAlarms = function (list) {
    _store.y_alarms = list;
};
var setQAlarms = function (list) {
    _store.q_alarms = list;
};
var setTechAlarms = function (list) {
    _store.tech_alarms = list;
}

var qmSettingsStore = objectAssign({}, EventEmitter.prototype, {
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
    },
    getSLCMOsettings: function () {
        return _store.sl_c_mo_settings;
    },
    getPiecer: function () {
        return _store.piecer;
    },
    getYAlarms: function () {
        return _store.y_alarms;
    },
    getQAlamrs: function () {
        return _store.q_alarms;
    },
    getTechAlarms: function () {
        return _store.tech_alarms;
    }
});

GraphDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
      case settingsConstants.SET_QM:
          setQMDec(action.data.qm_dec);
          setQMRem(action.data.qm_rem);
          qmSettingsStore.emit(CHANGE_EVENT);
          break;
      case settingsConstants.SET_PIECER:
          setPiecer(action.data);
          qmSettingsStore.emit(CHANGE_EVENT);
          break;
      case settingsConstants.SET_Q_ALARMS:
          setQAlarms(action.data);
          qmSettingsStore.emit(CHANGE_EVENT);
          break;
      case settingsConstants.SET_Y_ALARMS:
          setYAlarms(action.data);
          qmSettingsStore.emit(CHANGE_EVENT);
          break;
      case settingsConstants.SET_SLCM_SETTING:
          setSLCMOsettings(action.data);
          qmSettingsStore.emit(CHANGE_EVENT);
          break;
      case settingsConstants.SET_TECH_ALARMS:
          setTechAlarms(action.data);
          qmSettingsStore.emit(CHANGE_EVENT);
          break;
      case settingsConstants.SET_QM_CHANNELS:
          setChannels(action.data);
          qmSettingsStore.emit(CHANGE_EVENT);
          break;
    default:
      return true;
  }
});

module.exports = qmSettingsStore;
