/**
 * Created by urunzl on 13.10.2016.
 */
import React,{Component} from 'react';
import openMenu from '../../../assets/menu-white.png';
import goBack from '../../../assets/back.png';
import './Menu.css'
import {Link} from 'react-router';
import OptionMenu from './OptionMenu';
import { browserHistory } from 'react-router';
import historyActions from '../../actions/historyActions';
import Options from '../Options/Options';
import MenuTopOptions from './MenuTopOptions';


class LeftMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            showOpt: false
        }
    }

    render(){
        const {routes,pathName, width} = this.props;
        const pathArray = pathName.split("/").filter(e => e.length);
        let obj = this.props.routes;
        let setting = null;
        let history = {};
        let visitedItems = [];

        if (pathArray.length !== 0 ){
            pathArray.map(function (item) {
                if (obj[item].name === item){
                    setting = obj[item].setting;
                    history = obj[item];
                    if ( Object.keys(obj[item].children).length !== 0){
                        obj = obj[item].children;
                        visitedItems.push(history)
                    }
                }
            })
        }
        //push to history if its finall page AND it isnt first page
        Object.keys(history).length !== 0 && this.props.saveToHistory ? historyActions.pushHistory(history) : false;

        return(
            <div id="menuOpen" className={this.state.showOpt ? "entireMenu open" : "entireMenu close"}>
                <MenuTopOptions update={this.updateShow.bind(this)} data={this.props.data} show={this.state.showOpt} pathName={pathName} routes={routes} />
                <div id="leftMenu">
                    <div className={"leftMenuItem"} onClick={this.updateShow.bind(this,!this.state.showOpt)}>
                        <img src={openMenu} id="menuButton" height="50px" width="50px" />
                    </div>
                    <div className={"leftMenuItem"} onClick={this.goDirection.bind(this,'back')}>
                        <img id="openMainMenu"  src={goBack}/>
                    </div>
                    <div className="leftMenuItem" onClick={this.goDirection.bind(this,'forward')}>
                        <img id="openMainMenu"  src={goFoward}/>
                    </div>

                    {visitedItems.map(function (item){
                        let model = item;
                        console.log(model.name,pathArray);
                        if (model.name !== pathArray[pathArray-1]){
                            return(
                                <div className={"leftMenuItem history"}>
                                    <div className="leftMenuArrow">
                                        <Link key={item} to={model.hash} className="menuLink">
                                            <img src={model.icon} height="50px" width="50px"/>
                                        </Link>
                                        <h4 className="itemValue">{model.value}</h4>
                                    </div>
                                    <div className="arrow">
                                        <img src={arrowDown} height="20px" width="20px"/>
                                    </div>
                                </div>
                            )
                        }
                    })}
                    {Object.keys(obj).map(function (item) {
                        let model = obj[item];
                        let activeItem = pathArray[pathArray.length-1] === model.name;
                        return(
                            <div className={activeItem ? "leftMenuItem active" : "leftMenuItem"}>
                                <Link key={item} to={model.hash} className="menuLink">
                                    <img src={model.icon} height="50px" width="50px"/>
                                    <h4 className="itemValue">{model.value}</h4>
                                </Link>

                            </div>
                        )
                    },this)}
                </div>
                {pathArray.length !== 0 && history.setting ? <Options show={false} data={this.props.data} options={setting} /> : false }
            </div>
        )

    }

    updateShow(show){
        this.setState({
            showOpt: show
        })
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
}

export default  LeftMenu;