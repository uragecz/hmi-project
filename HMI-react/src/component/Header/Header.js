/**
 * Created by urunzl on 29.7.2016.
 */
import React, { Component } from 'react';
import ModalHelp from '../ModalWindow/ModalHelp';
import Languages from '../Languages/Languages';
import './Header.css'
import forward from '../../../assets/forward.png';
import back from '../../../assets/back.png';
import { browserHistory } from 'react-router';

class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            clicked: false,
        };
    };
    render(){
        const{pathName} = this.props;
        return(
            <div id="header">
                <div id="info-buttons">
                    <div className="info-button" onClick={this.goDirection.bind(this,'back')}>
                        <img src={back} height={60} width={50} />
                    </div>
                    <div className="lane">
                    </div>
                    <div className="info-button" onClick={this.goDirection.bind(this,'forward')}>
                        <img src={forward} height={60} width={50} />
                    </div>
                    <div className="info-button">
                        <button className={'infoButton' + (this.state.clicked? " open" : "")} onClick={this.handleClick.bind(this)}>?</button>
                    </div>
                    <Languages switchLanguage={this.props.switchLanguage}/>
                </div>
                {this.state.clicked? <ModalHelp update={this.handleClick.bind(this)} /> : false }
                <div className="info-inputs">
                    <div className="infInput">
                        <input className={'pathInput'} value={pathName} onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="infInput">
                        <input className={'pathInput'} onChange={this.handleChange.bind(this)}/>
                    </div>
                </div>
                <div id="machine-button">
                    <div className="arrow-right"></div>
                </div>
            </div>
        )
    }

    handleChange(){

    }

    goDirection(direction){
        switch(direction){
            case 'forward':
                browserHistory.goForward();
                break;
            case 'back':
                browserHistory.goBack();
                break;
            default:
                break;
        }
    }

    handleClick(){
        this.setState({
            clicked: !this.state.clicked
        })
    }
}

export default Header;