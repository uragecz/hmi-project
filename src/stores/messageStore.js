/**
 * Created by urunzl on 20.1.2017.
 */
var messageConstants = require('../constants/messageConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _store = {
    showMessage: false,
    message: '',
    error: false
};



var serverStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getIsMessageShow: function(){
        return _store.showMessage;
    },
    getMessage: function(){
        return _store.message;
    },
    getIsError: function(){
        return _store.error;
    }
});

var hideMessage = function(){
    _store.showMessage = false;
    serverStore.emit(CHANGE_EVENT);
};

var showMessage = function(message,error){
    _store.showMessage = true;
    _store.message = message;
    _store.error = error;
    setTimeout(() => hideMessage(), 5000);
};

Dispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case messageConstants.SHOW_MESSAGE:
            showMessage(action.data,action.error);
            serverStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});



module.exports = serverStore;