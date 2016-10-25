/**
 * Created by Lukáš on 6/6/2016.
 */
import Dispatcher from '../dispatcher/Dispatcher';
import graphConstants from '../constants/graphConstants';
import http from 'superagent';

var timer;
var graphActions = {
  ///GRAPH ACTIONS
  saveValueToMachine: async function(list){
    try {
      let obj = await graphActions.sendData(list);
      if (obj) {
        Dispatcher.handleAction({
          actionType: graphConstants.CHANGE_VALUES,
          data: list
        });
      }
    }
    catch(err){
      console.log(err);
    }
  },

  getValueFromMachine: async function(){
    try{
      let obj = await graphActions.getData();
      Dispatcher.handleAction({
        actionType: graphConstants.GET_VALUES,
        data: obj
      });
    }
    catch(err){
      console.log('chyba');
    }
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

  ///COMMUNICATION WITH SERVER
  getData: function(){
    return new Promise(function(resolve, reject) {
    http.get("http://localhost:59297/api/qm")
      .accept("application/json")
      .end(function(err, res) {
        if (err == null && res.ok)
          resolve(res.body);
        else
          reject(false);
      })
    })
  },

  sendData: function(obj){
    console.log(obj);
    return new Promise(function(resolve, reject) {
      http.post("http://localhost:59297/api/qm/postqm")
        .set('Content-Type', 'application/json')
        .send('lol')
        .end(function (err, res){
          if (err == null && res.ok)
            resolve(true);
          else
            reject(false);
        })
    })
  },
};

export default graphActions;
      

    

    
    
          



