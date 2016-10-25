/**
 * Created by urunzl on 20.10.2016.
 */
/**
 * Created by urunzl on 6.10.2016.
 */
import Dispatcher from '../dispatcher/Dispatcher';
import settingsConstants from '../constants/settingsConstants';
import http from 'superagent';

var settingsActions = {
    setProductPackage: function(group){
        Dispatcher.handleAction({
            actionType: settingsConstants.SET_PRODUCT_PACKAGE,
            data: group
        });
    },
    setProductSpeed: function(group){
        console.log('setSpeed');
        Dispatcher.handleAction({
            actionType: settingsConstants.SET_PRODUCT_SPEED,
            data: group
        });
    },
    setQSI: function(group){
        Dispatcher.handleAction({
            actionType: settingsConstants.SET_PRODUCT_QSI,
            data: group
        });
    },
    setFSI: function(group){
        Dispatcher.handleAction({
            actionType: settingsConstants.SET_PRODUCT_FSI,
            data: group
        });
    },
    setASI: function(group){
        Dispatcher.handleAction({
            actionType: settingsConstants.SET_PRODUCT_ASI,
            data: group
        });
    },
    setAMISpin: function(group){
        Dispatcher.handleAction({
            actionType: settingsConstants.SET_PRODUCT_AMISpin,
            data: group
        });
    },
    setAir: function(group){
        Dispatcher.handleAction({
            actionType: settingsConstants.SET_PRODUCT_AIR,
            data: group
        });
    },
    setRotor: function(group){
        Dispatcher.handleAction({
            actionType: settingsConstants.SET_PRODUCT_ROTOR,
            data: group
        });
    }
};

export default settingsActions;