/**
 * Created by urunzl on 1.8.2016.
 */
import React from 'react';
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router';
import route from './route/route';
import './index.css';

ReactDOM.render(<Router history={browserHistory} routes={route}/>, document.getElementById("app"));

