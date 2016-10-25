/**
 * Created by urunzl on 4.10.2016.
 */

var selectionConstants = require('../constants/selectionConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _store = {
    activeGroup: "A",
    activeUnit: "1",
    activeShift: "current",
    minUnit: 0,
    maxUnit: 2,
    unitStep: 1,
    shiftList: {},
    groupList: {}
};

var setActiveGroup = function(group){
    _store.activeGroup = group;
};
var setActiveUnit = function(unit){
    _store.activeUnit = unit;
};
var setActiveShift = function(current){
    _store.activeShift = current;
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
    getActiveGroup: function(){
        return _store.activeGroup;
    },
    getActiveUnit: function(){
        return _store.activeUnit;
    },
    getActiveShift: function(){
        return _store.activeShift;
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
    }
});

Dispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case selectionConstants.SWITCH_GROUP:
            setActiveGroup(action.data);
            selectionStore.emit(CHANGE_EVENT);
            break;
        case selectionConstants.SWITCH_SHIFT:
            setActiveShift(action.data);
            selectionStore.emit(CHANGE_EVENT);
            break;
        case selectionConstants.SWITCH_UNIT:
            setActiveUnit(action.data);
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
        default:
            return true;
    }
});

module.exports = selectionStore;
