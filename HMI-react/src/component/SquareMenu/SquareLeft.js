/**
 * Created by urunzl on 23.9.2016.
 */
import React,{Component} from 'react';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
import goBack from '../../../assets/back.png';

class SquareLeft extends Component{
    render(){
        const {routes} = this.props;
        return(
            <div id="leftMenu">

                <div className="leftMenuItem">
                    <img id="openMainMenu" onClick={this.goDirection.bind(this,'back')} src={goBack}/>
                </div>
                {Object.keys(routes).map(function(item){
                    let model = routes[item];
                    return(
                        <div className="leftMenuItem">
                            <Link key={item} to={model.hash} className="menuLink">
                            <img src={model.icon} className="mainIcon"/>
                            </Link>
                        </div>
                    )
                })}
            </div>
        )
    }

    goDirection(direction){
        console.log(browserHistory);
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
}

export default SquareLeft;