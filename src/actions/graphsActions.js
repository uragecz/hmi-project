/**
 * Created by urunzl on 8.2.2017.
 */
import Dispatcher from '../dispatcher/Dispatcher';
import graphsConstants from '../constants/faultReportConstants';
import serverActions from '../actions/serverActions';
//import http from 'superagent';

var graphsActions = {
    setProductPackage: async function (list) {
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: graphsConstants.SET_CUTS,
                data: list
            });
        }
    },
};

export default graphsActions;