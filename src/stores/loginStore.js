/**
 * Created by urunzl on 24.1.2017.
 */
var loginConstants = require('../constants/loginConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

const users = {
    "user1":{
        level: 1,
        name: "name1",
        password: "3333"
    },
    "user2":{
        level: 2,
        name: "name2",
        password: "4444"
    }
};

var _store = {
    loggedUser: null
};

var login = function(model){
    _store.loggedUser = model;
};

var logout = function(){
    _store.loggedUser = null;
};

var loginStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getLoggedUser: function(){
        return _store.loggedUser;
    },
    getUsers: function(){
        return users;
    }
});

Dispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case loginConstants.LOGIN:
            login(action.data);
            loginStore.emit(CHANGE_EVENT);
            break;
        case loginConstants.LOGOUT:
            logout();
            loginStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = loginStore;