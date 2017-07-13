/**
 * Created by urunzl on 6.10.2016.
 */

import Dispatcher from '../dispatcher/Dispatcher';
import selectionConstants from '../constants/selectionConstants';
import serverActions from './serverActions';

var shiftURL = "";
var groupURL = "";
var articleURL = "";

var selectionActions = {
    switchUnit: function(unit){
        Dispatcher.handleAction({
            actionType: selectionConstants.SWITCH_UNIT,
            data: unit
        });
    },

    switchGroup: function(group){
        Dispatcher.handleAction({
            actionType: selectionConstants.SWITCH_GROUP,
            data: group
        });
    },

     switchArticle: function(article){
        Dispatcher.handleAction({
            actionType: selectionConstants.SWITCH_ARTICLE,
            data: article
        });
    },


    switchShift: function(shift){
        Dispatcher.handleAction({
            actionType: selectionConstants.SWITCH_SHIFT,
            data: shift
        });
    },

    getShiftList: function(){
        let obj = serverActions.getData(shiftURL);
        if(obj){
            Dispatcher.handleAction({
                actionType: selectionConstants.SET_SHIFTS,
                data: obj
            });
        }
    },

    getGroupList: function(){
        let obj = serverActions.getData(groupURL);
        if(obj){
            Dispatcher.handleAction({
                actionType: selectionConstants.SET_GROUPS,
                data: obj
            });
        }
    },

    getActicleList: function(){
        let obj = serverActions.getData(articleURL);
        if(obj){
            Dispatcher.handleAction({
                actionType: selectionConstants.SET_GROUPS,
                data: obj
            });
        }
    },

    setActiveItem: function(data){
        Dispatcher.handleAction({
            actionType: selectionConstants.SET_ACTIVE_ITEM,
            data: data
        });
    },

    setShiftActive: function () {
        Dispatcher.handleAction({
            actionType: selectionConstants.SET_SHIFT_ACTIVE,
        });
    }
};

export default selectionActions;