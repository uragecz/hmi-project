/**
 * Created by urunzl on 29.7.2016.
 */
import React, { Component } from 'react';
import './Footer.css'

class Footer extends Component{
    render(){
        var currentdate = new Date();
    return(
        <div id="footer">
            <div id="left-bottom-image">
                <img id="logo" src='../../assets/rieter.png'/>
             </div>
            <div id="right-bottom-timer">
                {currentdate.getDay() + "." + currentdate.getMonth() + "." + currentdate.getYear() + " " + currentdate.getHours() + ":" +currentdate.getMinutes()}
            </div>
        </div>
    )
}
}

export default Footer;