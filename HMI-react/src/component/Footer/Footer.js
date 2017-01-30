/**
 * Created by urunzl on 29.7.2016.
 */
//components
import React, { Component } from 'react';
import StartButton from '../StartButton/StartButton';
import Help from '../Help/Help';
import Message from '../Message/Message';
import Clock from '../Clock/Clock';
//css,images
import './Footer.css'
import warningMark from '../../../assets/warningMark.png';
import warningMan from '../../../assets/warningMan.png';
import bleach from '../../../assets/bleach.png';

const obj={
  groupA:{
      status: true
  },
    groupB:{
        status: false
    },
    groupC:{
        status: false
    },
    groupD:{
        status: false
    }
};

class Footer extends Component{
    constructor(props){
        super(props);
        this.state = {
            openHelp: false,
        }
    }
    render(){
        return(
            <div className="entirePage" >
                <div id="footer">
                    <div id="bottomLeft">
                        <div className="bottom-item image" onClick={this.handleLogoClick.bind(this)}>
                            <img id="logo" src='../../assets/rieter.png'/>
                        </div>
                        <div className="bottom-item date">
                            <Clock time={true} date={true}/>
                        </div>
                        <div className="bottom-item warning-input">
                            <img src={warningMark} height={20}/>
                            <div id="warning-inputInfo">
                                <input id="warning-input" value={"Chyba"} onChange={this.handleChange.bind(this)} type="text"/>
                                <img id="warning-man-image" src={warningMan} height={25} />
                                <img id="warning-bleach-image" src={bleach} height={20} />
                            </div>
                        </div>
                    </div>
                    <div id="bottomRight">
                        <div className="bottom-item start-button">
                            <StartButton groups={obj}/>
                        </div>
                    </div>
                </div>
                {this.state.openHelp ? <Help closeHelpPage={this.handleLogoClick.bind(this)} {...this.props} />: false}
                <Message />
            </div>
        )
    }
    handleChange(){

    }

    handleLogoClick(){
        this.setState({
            openHelp: !this.state.openHelp
        })
    }
}

export default Footer;