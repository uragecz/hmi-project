/**
 * Created by urunzl on 20.1.2017.
 */
var helpConstants = require('../constants/helpConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _store = {
    rendering: false
};

var setRendering = function(){
    _store.rendering = !_store.rendering;
};

var helpStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getIsRendering: function(){
        return _store.rendering;
    }
});

Dispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case helpConstants.SET_RENDERING:
            setRendering();
            helpStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = helpStore;