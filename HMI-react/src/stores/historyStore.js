/**
 * Created by urunzl on 7.10.2016.
 */
/**
 * Created by urunzl on 4.10.2016.
 */

var historyConstants = require('../constants/historyConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _store = {
    visitedLinks: []
};


var addVisitedLink = function(link){
    _store.visitedLinks.map(function(item){
        if (item.name === link.name){
            let index = _store.visitedLinks.indexOf(link);
            if (index > -1) {
                _store.visitedLinks.splice(index, 1);
            }
        }
        else if(_store.visitedLinks.length > 5){
            _store.visitedLinks.shift();
        }
    });
    _store.visitedLinks.push(link);
};

var historyStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb);
    },
    getVisitedLinks: function(){
        return _store.visitedLinks;
    }
});

Dispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case historyConstants.ADD_LINK:
            addVisitedLink(action.data);
            historyStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = historyStore;
