/**
 * Created by urunzl on 6.10.2016.
 */

import Dispatcher from '../dispatcher/Dispatcher';
import selectionConstants from '../constants/selectionConstants';

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

    switchShift: function(shift){
        Dispatcher.handleAction({
            actionType: selectionConstants.SWITCH_SHIFT,
            data: shift
        });
    },

    getShiftList: function(){

    },

    getGroupList: function(){

    }
};

export default selectionActions;