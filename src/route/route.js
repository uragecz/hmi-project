/**
 * Created by urunzl on 2.8.2016.
 */
import React from 'react';
import { Route, browserHistory, Redirect  } from 'react-router';
import App from '../component/App/App';
import pages from '../pages/pages';
import routes from './routes';
/* eslint-disable */
let arr = [];
function loopThrough(obj){
    for(let key in obj){
        if(!obj.hasOwnProperty(key)) continue;
        if(typeof obj[key] !== 'object'){
        } else {
            obj.hash !== undefined ? arr.push(<Route key={obj.hash} name={obj.name} path={obj.hash} component={pages[obj.page]} />) : false;
            loopThrough(obj[key]);
        }
    }
    return arr;
}

export default (
    <Route component={App} history={browserHistory}>
        <Redirect from="/" to="/settings/product-settings" component={pages["ProductSettings"]}/>
        {
            loopThrough(routes)
        }
    </Route>
)