/**
 * Created by urunzl on 20.10.2016.
 */
/**
 * Created by urunzl on 6.10.2016.
 */
import Dispatcher from '../dispatcher/Dispatcher';
import settingsConstants from '../constants/settingsConstants';
import serverActions from '../actions/serverActions';
//import http from 'superagent';

var settingsActions = {
    setProductPackage: async function(list){
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: settingsConstants.SET_PRODUCT_PACKAGE,
                data: list
            });
        }
    },
    setProductSpeed: async function(list){
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: settingsConstants.SET_PRODUCT_SPEED,
                data: list
            });
        }
    },
    setQSI: async function(list){
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: settingsConstants.SET_PRODUCT_QSI,
                data: list
            });
        }
    },
    setFSI: async function(list){
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: settingsConstants.SET_PRODUCT_FSI,
                data: list
            });
        }
    },
    setASI: async function(list){
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: settingsConstants.SET_PRODUCT_ASI,
                data: list
            });
        }
    },
    setAMISpin: async function(list){
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: settingsConstants.SET_PRODUCT_AMISpin,
                data: list
            });
        }
    },
    setAir: async function(list){
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: settingsConstants.SET_PRODUCT_AIR,
                data: list
            });
        }
    },
    setRotor: async function(list){
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: settingsConstants.SET_PRODUCT_ROTOR,
                data: list
            });
        }
    },
    setSilverFeedLength: async function(list){
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: settingsConstants.SET_PRODUCT_SVL,
                data: list
            });
        }
    }
};

export default settingsActions;