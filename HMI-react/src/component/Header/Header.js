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
            <div></div>
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