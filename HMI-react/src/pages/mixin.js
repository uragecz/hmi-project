/**
 * Created by urunzl on 6.9.2016.
 */
var NProgress = require('nprogress');
import React from 'react';

var ProgressMixin = React.createClass({
    componentWillMount: function() {
        NProgress.start();
    },

    componentDidMount: function() {
        console.log('neco')
        NProgress.done();
    },

    start: function(){

        NProgress.start();
    },
    stop: function(){
        NProgress.done();
    },

    render: function(){
        return(<div></div>)
    }
});

module.exports = ProgressMixin;