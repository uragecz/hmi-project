/**
 * Created by urunzl on 30.1.2017.
 */
//components
import React, { Component } from 'react';
import Clock from '../Clock/Clock';

//styles + images   
import './InfoPage.css';

class InfoPage extends Component{
    render(){
        return(
            <div id="infoPage" onClick={this.closePage.bind(this)}>
                <h1 id="infoPageText"></h1>
                <div id="infoPageTime">
                    <Clock time={true} date={false}/>
                </div>
            </div>
        )
    }
    closePage(){
        this.props.closeInfoPage();
    }


}

export default InfoPage;