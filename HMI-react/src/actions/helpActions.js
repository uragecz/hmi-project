/**
 * Created by urunzl on 16.1.2017.
 */
import { browserHistory } from 'react-router'
import routes from '../route/routes';
//import http from 'superagent';
import Dispatcher from '../dispatcher/Dispatcher';
import helpConstants from '../constants/helpConstants';

var items = [];
var counter = -1;
var helpActions = {
    loaded: false,
    actualPage: null,

    printOnePage: function() {
        console.log('printOnePage');
    },
    printAllPages: function(item) {
        Dispatcher.handleAction({
            actionType: helpConstants.SET_RENDERING,
        });

        items = [];
        counter = -1;
        helpActions.actualPage = item;
        helpActions.printAll(routes);
    },

    printAll: async function(obj){
        for(let key in obj){
            if(!obj.hasOwnProperty(key)) continue;
            if(typeof obj[key] !== 'object'){
            } else {
                if(obj.page && items[counter] !== obj.page) {
                    counter++;
                    items.push(obj.page);
                    await helpActions.renderAndPrint(obj.hash)
                }
                await this.printAll(obj[key]);
            }
        }
        browserHistory.push(helpActions.actualPage);

        Dispatcher.handleAction({
            actionType: helpConstants.SET_RENDERING,
        });
    },

    renderAndPrint: function(hash){
        browserHistory.push(hash);
        return new Promise((done)=>{
            setTimeout(()=>{
                helpActions.printOnePage();
                setTimeout(()=>{
                    done(true);
                },1000);
            },1000);
        });

    },
};

export default helpActions;