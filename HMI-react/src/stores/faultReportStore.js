/**
 * Created by urunzl on 8.2.2017.
 */
var faultReportConstants = require('../constants/faultReportConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _store = {
    cuts: {
        "SUM": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "N": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "S": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "L": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "T": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "SL+": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "SL-": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "C+": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "C-": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "MO": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "P+": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "P-": {
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        }
    },
    qualityValues:{
        "CVopt":{

        },
        "RV":{

        },
        "IPI nepis":{

        },
        "IPI thick":{

        },
        "IPI thin":{

        },
    },
    qAlarms:{
        "SUM":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "CVopt-A":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "IPI-A":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        }
    },
    yAlarms:{
        "SUM":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "NSLT-A":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "SL-A":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
        "MO-A":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        }
    },
    techAlarms:{
        "Ref-A":{
            abs:    {value: 0, unit: "Abs"},
            rh:     {value: 0, unit: "Rh"},
            km:     {value: 0, unit: "km"}
        },
    }
};

var setCuts = function(list){
    _store.cuts = list;
};
var setTechAlarms = function(list){
    _store.techAlarms = list;
};
var setQAlarms = function(list){
    _store.qAlarms = list;
};
var setYAlarms = function(list){
    _store.yAlarms = list;
};
var setQualityValues = function(list){
    _store.qualityValues = list;
};

var faultReportStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getCuts: function(){
        return _store.cuts;
    },
    getQualityValues: function(){
        return _store.qualityValues;
    },
    getQAlarms: function(){
        return _store.qAlarms;
    },
    getYAlarms: function(){
        return _store.yAlarms;
    },
    getTechAlarms: function(){
        return _store.techAlarms;
    }
});

Dispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case faultReportConstants.SET_CUTS:
            setCuts(action.data);
            faultReportStore.emit(CHANGE_EVENT);
            break;
        case faultReportConstants.SET_Q_ALARMS:
            setQAlarms(action.data);
            faultReportStore.emit(CHANGE_EVENT);
            break;
        case faultReportConstants.SET_Y_ALARMS:
            setYAlarms(action.data);
            faultReportStore.emit(CHANGE_EVENT);
            break;
        case faultReportConstants.SET_QUALITY_VALUES:
            setQualityValues(action.data);
            faultReportStore.emit(CHANGE_EVENT);
            break;
        case faultReportConstants.SET_TECH_ALARMS:
            setTechAlarms(action.data);
            faultReportStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = faultReportStore;