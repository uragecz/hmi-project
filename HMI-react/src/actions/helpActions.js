/**
 * Created by urunzl on 16.1.2017.
 */
import { browserHistory } from 'react-router'
import routes from '../route/routes';
import serverActions from './serverActions';
import tabStore from '../stores/tabsStore';
//import http from 'superagent';
import Dispatcher from '../dispatcher/Dispatcher';
import helpConstants from '../constants/helpConstants';
import messageConstants from '../constants/messageConstants';
var url = "http://localhost:5010/screenshot";
var items = [];
var counter = -1;
var helpActions = {
    actualPage: null,
    actualPageName: '',

    printPage: async function (lang){
        let tabs = tabStore.getOpenTabs();
        let name = tabs[tabStore.getActiveTab()][0];
        await serverActions.getData(url + "?name=" +name + "&lang=" + lang);
    },

    printOnePage: async function(lang) {
        helpActions.printPage(lang);
        Dispatcher.handleAction({
            actionType: messageConstants.SHOW_MESSAGE,
            data: "DONE",
            error: false
        });
    },
    printAllPages: async function(lang) {
        Dispatcher.handleAction({
            actionType: helpConstants.SET_RENDERING,
        });

        items = [];
        counter = -1;
        let tabs = tabStore.getOpenTabs();
        helpActions.actualPage = tabs[tabStore.getActiveTab()][1];
        await helpActions.printAll(routes,lang);

        Dispatcher.handleAction({
            actionType: messageConstants.SHOW_MESSAGE,
            data: "DONE",
            error: false
        });

        Dispatcher.handleAction({
            actionType: helpConstants.SET_RENDERING,
        });
    },

    printAll: async function(obj,lang){
        for(let key in obj){
            if(!obj.hasOwnProperty(key)) continue;
            if(typeof obj[key] !== 'object'){
            } else {
                if(obj.page && items[counter] !== obj.page) {
                    counter++;
                    items.push(obj.page);
                    await helpActions.renderAndPrint(obj.hash,lang)
                }
                await this.printAll(obj[key],lang);
            }
        }
        browserHistory.push(helpActions.actualPage);
    },

    renderAndPrint: function(hash,lang){
        browserHistory.push(hash);
        return new Promise((done)=>{
            setTimeout(()=>{
                helpActions.printPage(lang);
                setTimeout(()=>{
                    done(true);
                },1000);
            },2000);
        });

    },
};

export default helpActions;