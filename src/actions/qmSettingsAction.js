/**
 * Created by Lukáš on 6/6/2016.
 */
import Dispatcher from '../dispatcher/Dispatcher';
import settingsConstants from '../constants/settingsConstants';
import serverActions from '../actions/serverActions';


/* eslint-disable */

var timer;
var qmSettingsAction = {
    setChannels: async function(list){
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: settingsConstants.SET_QM_CHANNELS,
                data: list
            });
        }
    },
    setSLCMO: async function(list){
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: settingsConstants.SET_SLCM_SETTING,
                data: list
            });
        }
    },
    setPiecer: async function(list){
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: settingsConstants.SET_PIECER,
                data: list
            });
        }
    },
    setQAlarms: async function(list){
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: settingsConstants.SET_Q_ALARMS,
                data: list
            });
        }
    },
    setYAlarms: async function(list){
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: settingsConstants.SET_Y_ALARMS,
                data: list
            });
        }
    },
    setTechAlarms: async function(list){
        let obj = await serverActions.sendData(list);
        if (obj) {
            Dispatcher.handleAction({
                actionType: settingsConstants.SET_TECH_ALARMS,
                data: list
            });
        }
    },
    getValueFromMachine: async function(){
        let obj = await serverActions.getData();
        Dispatcher.handleAction({
            actionType: settingsConstants.SET_QM,
            data: obj
        });
    },
 
    startLoadValue: function(){
        timer= setInterval(qmSettingsAction.loadValue, 10000);
    },

    stopLoadValue: function(){
        clearInterval(timer);
    },
};

export default qmSettingsAction;
      

    

    
    
          



