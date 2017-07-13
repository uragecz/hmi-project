/**
 * Created by urunzl on 4.10.2016.
 */

var selectionConstants = require('../constants/selectionConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _store = {
    isShiftActive: true,
    group: 0,
    unit: 1,
    shift: 0,
    article: 0,
    minUnit: 0,
    maxUnit: 30,
    unitStep: 1,
    activeItem: 'group',
    groupList: ["PB1","PB2","PB3"],
    shiftList:[["1","Smena1","7:00","15:30","27.7"],["2","Smena2","15:30","21:30","27.7"]],
    articleList:["Perla a.s CZ, Bavlna, 22Text, 5,5Tex", "Article2 CZ UNO","Article3 EN UNO"]
};

var setActiveItem = function(item){
    _store.activeItem = item;
};
var setShiftActive= function(){
    _store.isShiftActive = !_store.isShiftActive;
};

var setGroup = function(group){
   _store.group = group < 0 || group >= _store.groupList.length ? _store.group : group;
};
var setUnit = function(unit){
    _store.unit = unit;
};
var setShift = function(shift){
    _store.shift = shift < 0 || shift >= _store.shiftList.length ? _store.shift : shift
};
var setArticle = function(article){
    _store.article = article < 0 || article >= _store.articleList.length ? _store.article : article;
};

var setShiftList = function(shiftList){
    _store.shiftList = shiftList;
};
var setGroupList = function(groupList){
    _store.groupList = groupList;
};
var setArticleList = function(articleList){
    _store.articleList = articleList;
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
     getArticleList: function(){
        return _store.articleList;
    },
    getShiftList: function(){
        return _store.shiftList;
    },

    getShift: function () {
        return _store.shift;
    },
    getArticle: function(){
        return _store.article;
    },
    getGroup: function(){
        return _store.group;
    },
    getUnit: function(){
        return _store.unit;
    },

    getActiveItem: function () {
        return _store.activeItem;
    },
    isShiftActive: function(){
        return _store.isShiftActive;
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
        case selectionConstants.SWITCH_ARTICLE:
            setArticle(action.data);
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
        case selectionConstants.SET_SHIFT_ACTIVE:
            setShiftActive();
            selectionStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = selectionStore;
