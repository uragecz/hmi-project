/**
 * Created by urunzl on 20.10.2016.
 */

var settingsConstants = require('../constants/settingsConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _store = {
    totalSpeed: {
        alfaTex:        {value: 0, unit: "alfa-tex"},
        twist:          {value: 0, unit: "T/m"},
        deliverySpeed:  {value: 0, unit: "m/min"},
        draft:          {value: 0, unit: "-"},
        feedingSpeed:   {value: 0, unit: "m/min"},
        rotorSpeed:     {value: 0, unit: "1/min"},
        openningRoller: {value: 0, unit: ""},
        speed:          {value: 0, unit: "1/min"}
    },
    package: {
        targetLength:           {value: 0, unit: "m"},
        targetWeight:           {value: 0, unit: "kg"},
        deltaLength:            {value: 0, unit: "m"},
        lengthCorrectionFactor: {value: 0, unit: "-"},
        numberOfCuts:           {value: 0, unit: ""},
        tensionDraft:           {value: 0, unit: "-"},
        WindingHelixAlfa:       {value: 0, unit: "Grad"},
        WindingWidth:           {value: 0, unit: "m"}
    },
    AMISpin: {
        piercingInDuration:     {value: 0, unit: "ms"},
        feedDuration:           {value: 0, unit: "ms"},
        yarnReturn:             {value: 0, unit: "ms"},
        compensatorTime:        {value: 0, unit: "s"},
        compensatorTimeDoffing: {value: 0, unit: "s"},
        yarnReserve:            {value: 0, unit: "mm"},
        yarnLength:             {value: 0, unit: "mm"}
    },
    silverFeedLength: {
        "VP1":{
            len:    {value: 0, unit: "mm"},
            dev:    {value: 0, unit: "%"},
            enable: true
        },
        "VP2":{
            len:    {value: 0, unit: "mm"},
            dev:    {value: 0, unit: "%"},
            enable: true
        },
        "VP3":{
            len:    {value: 0, unit: "mm"},
            dev:    {value: 0, unit: "%"},
            enable: true
        },
        "VP4":{
            len:    {value: 0, unit: "mm"},
            dev:    {value: 0, unit: "%"},
            enable: true
        },
        "VP5":{
            len:    {value: 0, unit: "mm"},
            dev:    {value: 0, unit: "%"},
            enable: true
        }
    },
    rotor: {
        type:           {value: "", unit:"string"},
        maxSpeed:       {value:0 , unit:"1/min"},
        diameter:       {value:0 , unit:"mm"},
        circumFerence:  {value:0 , unit:"mm"},
        axisdiameter:   {value:0 , unit:"mm"}
    },
    air:{
        spinningVacuum: {value: 0, unit:""},
        a:              {value: 0, unit:""},
        trashRemoval:   {value: 0, unit:""},
        b:              {value: 0, unit:""}
    },
    qsi:{
        enable: false,
        vacuumSettings: {
            QSIVacuum:  {value: 0, unit: "mbar"}
        },
        settingsQSI:{
            sectionDellay:          {value: 0, unit: "s"},
            fibreFringePreparation: {enable: false},
            rotor:                  {value: 0, unit: "s"}
        }
    },
    fsi:{
        enable: false,
        afterMachineStop: {
            liftDelay:          {value: 0, unit: "ms"},
            trailingRunFeeding: {value: 0, unit: "ms"},
            compensator:        {value: 0, unit: ""}
        },
        afterQualityCut:{
            liftDelay:          {value: 0, unit: "ms"},
            trailingRunFeeding: {value: 0, unit: "ms"},
            compensator:        {value: 0, unit: ""}
        }
    },
    asi: {
        enable: false,
        yarnAndPreparationParameters: {
            yarnAndPreparation: {enable: false},
            duration:           {value: 0, unit: "s"},
            vacuum:             {value: 0, unit: "mbar"},
            length:             {value: 0, unit: "mm"},
            yarnLengthReserve:  {enable: false},
            duration1:          {value: 0, unit: ""},
            s1:                 {value: 0, unit: ""},
            s2:                 {value: 0, unit: ""},
            s3:                 {value: 0, unit: ""}
        },
        ASIparameters: {
            rotorSpeedLevenWhenStarting: {value: 0, unit: "%"},
            ASIYarnReturn:               {value: 0, unit: "ms"},
            ASIFeedingDuration:          {value: 0, unit: "ms"}
        },
        controlledStopParameters: {
            rotorSpeedLevelWhenStopping:       {value: 0, unit: "%"},
            packageBrakingTime:                {value: 0, unit: "ms"},
            yarnEndReturnLength:               {value: 0, unit: "mm"},
            machineStopDelayAfterPowerFailure: {value: 0, unit: "%"}
        }
    },
};

var setPackage = function(list){
    _store.package = list;
};
var setTotalSpeed = function(list){
    _store.totalSpeed = list;
};
var setAMISpin = function(list){
    _store.AMISpin = list;
};
var setQSI = function (list) {
    _store.qsi = list;
};
var setFSIAfterStop = function (list) {
    _store.fsi.afterMachineStop = list;
};
var setFSIAfterCut = function (list) {
    _store.fsi.afterQualityCut = list;
};
var setASI = function (list) {
    _store.asi = list;
};
var setAIR = function (list) {
    _store.air = list;
};
var setROTOR = function (list) {
    _store.rotor = list;
};
var setSVL = function (list) {
    _store.silverFeedLength = list;
};


var productSettingsStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getPackage: function(){
        return _store.package;
    },
    getTotalSpeed: function(){
        return _store.totalSpeed;
    },
    getQSI: function(){
        return _store.qsi;
    },
    getFSI: function(){
        return _store.fsi;
    },
    getASI: function () {
        return _store.asi;
    },
    getAMISpin: function(){
        return _store.AMISpin;
    },
    getAIR: function(){
        return _store.air;
    },
    getROTOR: function(){
        return _store.rotor;
    },
    getSVL: function(){
        return _store.silverFeedLength;
    }
});

Dispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case settingsConstants.SET_PRODUCT_PACKAGE:
            setPackage(action.data);
            productSettingsStore.emit(CHANGE_EVENT);
            break;
        case settingsConstants.SET_PRODUCT_SPEED:
            setTotalSpeed(action.data);
            productSettingsStore.emit(CHANGE_EVENT);
            break;
        case settingsConstants.SET_PRODUCT_QSI:
            setQSI(action.data);
            productSettingsStore.emit(CHANGE_EVENT);
            break;
        case settingsConstants.SET_PRODUCT_FSI_AFTERStop:
            setFSIAfterStop(action.data);
            productSettingsStore.emit(CHANGE_EVENT);
            break;
        case settingsConstants.SET_PRODUCT_FSI_AFTERCut:
            setFSIAfterCut(action.data);
            productSettingsStore.emit(CHANGE_EVENT);
            break;
        case settingsConstants.SET_PRODUCT_ASI:
            setASI(action.data);
            productSettingsStore.emit(CHANGE_EVENT);
            break;
        case settingsConstants.SET_PRODUCT_AMISpin:
            setAMISpin(action.data);
            productSettingsStore.emit(CHANGE_EVENT);
            break;
        case settingsConstants.SET_PRODUCT_ROTOR:
            setROTOR(action.data);
            productSettingsStore.emit(CHANGE_EVENT);
            break;
        case settingsConstants.SET_PRODUCT_AIR:
            setAIR(action.data);
            productSettingsStore.emit(CHANGE_EVENT);
            break;
        case settingsConstants.SET_PRODUCT_SVL:
            setSVL(action.data);
            productSettingsStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = productSettingsStore;
