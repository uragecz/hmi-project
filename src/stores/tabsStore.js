/**
 * Created by urunzl on 24.11.2016.
 */

var tabsConstants = require('../constants/tabsConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _store = {
    openTabs: [
        {
            hash: "/home",
            names: {
                cz: "Doma",
                eng:"Home"
            },
            name: "home",
            page: null,
            value: "1",
            icon: "../../assets/Articles.png",
            children: {}
        },
    ],
    activeTab: 0
};

var addTab = function(item){
    _store.openTabs.push(item);
    _store.activeTab = _store.openTabs.length-1;
};

var closeTab = function(index){
    //pokud je zavren otevreny tab a zaroven neni posledni pak aktivni zustane stejny
    if((_store.activeTab === index) && (index !== _store.openTabs.length-1)){}
    //pokud se zavira predposledni tab pak autimaticky aktualni je na 0 pozici
    else if((_store.activeTab-1)< 0 )
        _store.activeTab = 0;
    //pri zavreni neaktualniho okna se aktualni tab zmensi o jeden
    else
        _store.activeTab -= 1;
    _store.openTabs.splice(index,1);
};

var changeTab = function(item){
    _store.openTabs[_store.activeTab] = item;
};

var changeActiveTab = function(index){
    _store.activeTab = index;
};

var tabsStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getOpenTabs: function(){
        return _store.openTabs;
    },
    getActiveTab: function(){
        return _store.activeTab;
    }
});

Dispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case tabsConstants.ADD_TAB:
            addTab(action.data);
            tabsStore.emit(CHANGE_EVENT);
            break;
        case tabsConstants.CLOSE_TAB:
            closeTab(action.data);
            tabsStore.emit(CHANGE_EVENT);
            break;
        case tabsConstants.CHANGE_TAB:
            changeTab(action.data,action.index);
            tabsStore.emit(CHANGE_EVENT);
            break;
        case tabsConstants.CHANGE_ACTIVE_TAB:
            changeActiveTab(action.data);
            tabsStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = tabsStore;