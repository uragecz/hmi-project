/**
 * Created by urunzl on 4.10.2016.
 */

var selectionConstants = require('../constants/selectionConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _store = {
    group: "PG1",
    unit: 1,
    shift: "current",
    minUnit: 0,
    maxUnit: 30,
    unitStep: 1,
    shiftList: {},
    groupList: {},
    activeItem: 'group',
    activeShift: true
};

var setActiveItem = function(item){
    _store.activeItem = item;
};
var setActiveShift = function(){
    _store.activeShift = !_store.activeShift;
};
var setGroup = function(group){
    _store.group = group;
};
var setUnit = function(unit){
    _store.unit = unit;
};
var setShift = function(current){
    _store.shift = current;
};
var setShiftList = function(shiftList){
    _store.shiftList = shiftList;
};
var setGroupList = function(groupList){
    _store.groupList = groupList;
};
var setMaxUnit = function(max){
    _store.maxUnit = max;
};
var setMinUnit = function(min){
    _store.minUnit = min;
};
var setUnitStep = function(step){
    _store.unitStep = step;
};

var selectionStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getGroup: function(){
        return _store.group;
    },
    getUnit: function(){
        return _store.unit;
    },
    getShift: function(){
        return _store.shift;
    },
    getMaxUnit: function(){
        return _store.maxUnit;
    },
    getMinUnit: function(){
        return _store.minUnit;
    },
    getUnitStep: function(){
        return _store.unitStep;
    },
    getGroupList: function(){
        return _store.groupList;
    },
    getShiftList: function(){
        return _store.shiftList;
    },
    getActiveItem: function () {
        return _store.activeItem;
    },
    getActiveShift: function () {
        return _store.activeShift;
    }
});

Dispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case selectionConstants.SWITCH_GROUP:
            setGroup(action.data);
            selectionStore.emit(CHANGE_EVENT);
            break;
        case selectionConstants.SWITCH_SHIFT:
            setShift(action.data);
            selectionStore.emit(CHANGE_EVENT);
            break;
        case selectionConstants.SWITCH_UNIT:
            setUnit(action.data);
            selectionStore.emit(CHANGE_EVENT);
            break;
        case selectionConstants.SET_GROUPS:
            setGroupList(action.data);
            setMaxUnit(action.data.maxUnit);
            setMinUnit(action.data.minUnit);
            setUnitStep(action.data.unitStep);
            selectionStore.emit(CHANGE_EVENT);
            break;
        case selectionConstants.SET_SHIFTS:
            setShiftList(action.data.list);
            selectionStore.emit(CHANGE_EVENT);
            break;
        case selectionConstants.SET_ACTIVE_ITEM:
            setActiveItem(action.data);
            selectionStore.emit(CHANGE_EVENT);
            break;
        case selectionConstants.SET_ACTIVE_SHIFT:
            setActiveShift();
            selectionStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = selectionStore;
