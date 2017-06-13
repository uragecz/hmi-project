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
    "A1": 10, "A2": 5, "A3": 3, "A4": 4, "A5": 5, "A6": 6, "B1": 11, "B2": 12, "B3": 13, "B4": 14,
    "B5": 15, "B6": 16, "C1": 21, "C2": 22, "C3": 23, "C4": 24, "C5": 25, "C6": 26, "D1": 31, "D2": 32,
    "D3": 33, "D4": 34, "D5": 35, "D6": 36, "E1": 41, "E2": 42, "E3": 43, "E4": 44, "E5": 45, "E6": 46,
    "F": 51, "G": 52, "G": 53, "I1": 61, "I2": 62, "J1": 63, "J2": 64, "K1": 65, "K2": 66
  },
  qm_rem : {
    "A1": 10, "A2": 5, "A3": 2, "A4": 3, "A5": 4, "A6": 5, "B1": 10, "B2": 11, "B3": 12, "B4": 13,
    "B5": 14, "B6": 15, "C1": 16, "C2": 17, "C3": 18, "C4": 19, "C5": 20, "C6": 21, "D1": 22, "D2": "23",
    "D3": 24, "D4": 25, "D5": 26, "D6": 27, "E1": 28, "E2": 29, "E3": 30, "E4": 31, "E5": 32,  "E6": 33,
    "F": 34, "G": 35, "H": 36, "I1": 37, "I2": 38, "J1": 39, "J2": 40, "K1": 41, "K2": 42
  },
  channels: {
      "N": {
          dev:    {value: 100, unit: "%"},
          len:    {value: 50, unit: "mm"},
          enable: true
      },
      "S1": {
          dev:    {value: 80, unit: "%"},
          len:    {value: 80, unit: "mm"},
          enable: true
      },
      "S2": {
          dev:    {value: 60, unit: "%"},
          len:    {value: 90, unit: "mm"},
          enable: true
      },
      "S3": {
          dev:    {value: 55, unit: "%"},
          len:    {value: 150, unit: "mm"},
          enable: true
      },
      "S4": {
          dev:    {value: 50, unit: "%"},
          len:    {value: 160, unit: "mm"},
          enable: true
      },
      "L1": {
          dev:    {value: 45, unit: "%"},
          len:    {value : 200, unit : "mm"},
          enable: true
      },
      "L2": {
          dev:    {value:40, unit: "%"},
          len:    {value: 250, unit: "mm"},
          enable: true
      },
      "L3": {
          dev:    {value: 25, unit: "%"},
          len:    {value: 360, unit : "mm"},
          enable: true
      },
      "T1": {
          dev:    {value: -25, unit: "%"},
          len:    {value: 86, unit: "mm"},
          enable: true
      },
      "T2": {
          dev:    {value: -28, unit: "%"},
          len:    {value: 180, unit: "mm"},
          enable: true
      },
      "T3": {
          dev:    {value: -30, unit: "%"},
          len:    {value: 300, unit: "mm"},
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
