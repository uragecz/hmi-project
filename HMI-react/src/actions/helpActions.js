/**
 * Created by urunzl on 16.1.2017.
 */
import { browserHistory } from 'react-router'
import routes from '../route/routes';
//import http from 'superagent';

var items = [];
var counter = -1;
var helpActions = {
    loaded: false,
    actualPage: null,

    printOnePage: function() {
        console.log('printOnePage');
    },
    printAllPages: function(item) {
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
                    console.log(obj.page,obj.hash);
                    counter++;
                    items.push(obj.page);
                    console.log(items);
                    await helpActions.renderAndPrint(obj.hash)
                }
                await this.printAll(obj[key]);
            }
        }
        browserHistory.push(helpActions.actualPage);
    },

    renderAndPrint: function(hash){
        browserHistory.push(hash);
        return new Promise((done)=>{
            setTimeout(()=>{
                helpActions.printOnePage();
                setTimeout(()=>{
                    console.log('printed');
                    done(true);
                },1000);
            },1000);
        });

    },
};

export default helpActions;