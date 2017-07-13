/**
 * Created by urunzl on 7.10.2016.
 */
import Dispatcher from '../dispatcher/Dispatcher';
import historyConstants from '../constants/historyConstants';

var historyActions = {
    pushHistory: function(link) {
        Dispatcher.handleAction({
            actionType: historyConstants.ADD_LINK,
            data: link
        });
    },
};

export default historyActions;