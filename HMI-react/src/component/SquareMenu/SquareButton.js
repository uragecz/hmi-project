/**
 * Created by urunzl on 23.9.2016.
 */
import React,{Component} from 'react';
import SquareMenu from './SquareMenu';
import './SquareMenu.css';

class SquareButton extends Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            source: "../../assets/menu-yell.png"
        };
        this.handleClick = this.handleClick.bind(this);
    }

    render(){
        const {...others} = this.props;
        return(
            <div id="squareMenu">
                    <div id="squareButton">
                        <img id="openSquareMain" onClick={this.handleClick} src={this.state.source}/>
                    </div>
                    <SquareMenu show={this.state.clicked} {...others} />
            </div>
        )
    }

    handleClick(){
        this.setState({
            clicked : !this.state.clicked,
            source: this.state.clicked? "../../assets/menu-yell.png" : "../../assets/menu-black.png"
        })
    }
}

export default SquareButton;
