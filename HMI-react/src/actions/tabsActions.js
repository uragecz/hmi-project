/**
 * Created by urunzl on 24.11.2016.
 */
import Dispatcher from '../dispatcher/Dispatcher';
import tabsConstants from '../constants/tabsConstants';

var tabsActions = {
    addTab: function(item) {
        Dispatcher.handleAction({
            actionType: tabsConstants.ADD_TAB,
            data: item
        });
    },
    closeTab: function(index) {
        Dispatcher.handleAction({
            actionType: tabsConstants.CLOSE_TAB,
            data: index
        })
    },
    changeTab: function(item,index) {
        Dispatcher.handleAction({
            actionType: tabsConstants.CHANGE_TAB,
            data: item,
            index: index
        })
    },
    changeActiveTab: function(index) {
        Dispatcher.handleAction({
            actionType: tabsConstants.CHANGE_ACTIVE_TAB,
            data: index
        })
    }
};

export default tabsActions;