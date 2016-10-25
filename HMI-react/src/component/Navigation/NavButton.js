/**
 * Created by urunzl on 15.8.2016.
 */
import React, { Component } from 'react';
import Navigation from './Navigation';
import './Navigation.css'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class NavButton extends Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            show: false,
            source: "../../assets/menu-yell.png"
        };
        this.handleClick = this.handleClick.bind(this);
    }

    render(){
        const {...others} = this.props;
        return(<div id="navigation">
            <img id="openNav" onClick={this.handleClick} src={this.state.source}/>
             {this.state.clicked ?
                 <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500}  transitionLeaveTimeout={500}>
                    <Navigation {...others} />
                 </ReactCSSTransitionGroup>: false}
            </div>
        )
    }

   handleClick(){
        console.log('click');
        this.setState({
            clicked : !this.state.clicked,
            show: !this.state.show,
            source: this.state.clicked? "../../assets/menu-yell.png" : "../../assets/menu-black.png"
        })
   }
}

export default NavButton;