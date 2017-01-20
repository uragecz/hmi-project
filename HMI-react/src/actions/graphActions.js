/**
 * Created by Lukáš on 6/6/2016.
 */
import Dispatcher from '../dispatcher/Dispatcher';
import graphConstants from '../constants/graphConstants';
import serverActions from '../actions/serverActions';


/* eslint-disable */

var timer;
var graphActions = {
  setChannels: async function(list){
      let obj = await serverActions.sendData(list);
      if (obj) {
        Dispatcher.handleAction({
          actionType: graphConstants.CHANGE_VALUES,
          data: list
        });
      }
  },

    getValueFromMachine: async function(){
      let obj = await serverActions.getData();
      Dispatcher.handleAction({
        actionType: graphConstants.GET_VALUES,
        data: obj
      });
    },
 
  loadValue: async function(){/*
    try {
      let obj = await graphActions.getData();
      Dispatcher.handleAction({
        actionType: graphConstants.REFRESH_ITEM,
        data: obj
      });
    }
    catch(err){

    }*/
  },
  
  startLoadValue: function(){
    timer= setInterval(graphActions.loadValue, 10000);
  },

  stopLoadValue: function(){
    clearInterval(timer);
  },
};

export default graphActions;
      

    

    
    
          



