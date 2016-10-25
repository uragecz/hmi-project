/**
 * Created by urunzl on 23.9.2016.
 */
import React,{Component} from 'react';
import SquareLeft from './SquareLeft';
import {Link} from 'react-router';
import goBack from '../../../assets/back.png';
import goFavourite from '../../../assets/favorite.png';
import goHistory from '../../../assets/historyClock.png';
import goForward from '../../../assets/forward.png';
import { browserHistory } from 'react-router';
import goHome from '../../../assets/home.png';
/* eslint-disable */
class SquareMenu extends Component{
    render(){
        const {pathName,show} = this.props;
        const pathArray = pathName.split("/").filter(e => e.length);
        let numberOfChild = 0;
        let obj = this.props.routes;
        let visitedItems= [];
        let posY= ['top','top','bottom','bottom'];
        let posX= ['left','right','left','right'];
        let counter = -1;

        if (pathArray.length !== 0 ){
            pathArray.map(function (item) {
                if (obj[item].name === item){
                    obj = obj[item].children;
                    obj[item] ? visitedItems.push(obj[item]) : false;
                }
            })
        }

        Object.keys(obj).map(function (item) {
            if (obj[item].name === pathArray[pathArray.length-1]) {
                numberOfChild = (Object.keys(obj[item].children).length);
            }
        });

        let size = Object.keys(obj).length < 5 ? 'small' :  Object.keys(obj).length < 7 ? 'medium' : 'large';

        return(
            <div id="fullMenu">
                <div className={show ? "squareMainMenu" : "squareMainMenu hide"}>
                    <div id="mainMenu">
                        <div id="mainMenuTop">
                            <div id="visitedItems">
                                <div className={"visitedItem" + (pathArray.length === 0 ? ' active' : '')}>
                                    <Link key='back' to={'/'} className="menuLink">
                                        <img src={goHome} className="mainIcon"/>
                                    </Link>
                                </div>
                                {visitedItems.map(function (item){
                                    let model = item;
                                    return(
                                        <div className={"visitedItem" + (model.name === pathArray[pathArray.length-1] ? ' active' : '')}>
                                            <Link key={item} to={model.hash} className="menuLink">
                                                <img src={model.icon} className="mainIcon"/>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                            <div id="favouriteItems">
                                <div className="favouriteItem">
                                    <img id="openMainMenu" onClick={this.goDirection.bind(this,'back')} src={goBack}/>
                                </div>
                                <div className="favouriteItem">
                                    <img id="openMainMenu" src={goHistory}/>
                                </div>
                                <div className="favouriteItem">
                                    <img id="openMainMenu" src={goFavourite}/>
                                </div>
                                <div className="favouriteItem">
                                    <img id="openMainMenu" onClick={this.goDirection.bind(this,'forward')} src={goForward}/>
                                </div>
                            </div>
                        </div>
                        {pathArray.length !== 0 ?
                            <div id="mainMenuList">
                                <div className="mainMenuSingleItem">
                                    {Object.keys(obj).map(function (item) {
                                        let model = obj[item];
                                        let activeItem = pathArray[pathArray.length - 1] === model.name;
                                        return (
                                            <div className={"menuItem " + size}>
                                                <Link key={item} to={model.hash} className="menuLink">
                                                    <img src={model.icon} className="mainIcon"/>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div> :
                            <div id="mainMenuList">
                                {Object.keys(obj).map(function (item) {
                                    return(
                                        <div className={"mainMenuMultiItem " + posX[++counter] + " " + posY[counter] }>

                                            {Object.keys(obj[item].children).map(function(i){
                                                let childModel = obj[item].children[i];
                                                return (
                                                    <div className={"menuItem " + size}>
                                                        <Link key={i} to={childModel.hash} className="menuLink">
                                                            <img src={childModel.icon} className="mainIcon"/>
                                                        </Link>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
                <SquareLeft routes={obj}/>
            </div>
        )
    }

    goDirection(direction){
        switch(direction){
            case 'forward':
                    browserHistory.goForward();
                break;
            case 'back':
                browserHistory.goBack();
                break;
        }
    }
}

export default SquareMenu;