/**
 * Created by urunzl on 29.7.2016.
 */
import React, { Component } from 'react';
import ModalHelp from '../ModalWindow/ModalHelp';
import Languages from '../Languages/Languages';
import './Header.css'

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
                    <div className="info-button">
                        <button className={'infoButton' + (this.state.clicked? " open" : "")} onClick={this.handleClick.bind(this)}>?</button>
                    </div>
                    <div className="info-button">
                        <Languages switchLanguage={this.props.switchLanguage}/>
                    </div>
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

    handleClick(){
        this.setState({
            clicked: !this.state.clicked
        })
    }
}

export default Header;