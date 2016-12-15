/**
 * Created by urunzl on 17.10.2016.
 */
//component/stores/action
import React,{Component} from 'react';
import { browserHistory } from 'react-router';
import historyActions from '../../actions/historyActions'
import TopMenu from './TopMenu';
import Options from '../Options/Options';
import MenuTopOptions from './MenuTopOptions';

//styles/icons
import './Menu.css';
import openMenu from '../../../assets/openMenu.png';

class Menu extends Component{
    constructor(props){
        super(props);
        this.state = {
            showMenu: false
        }
    }

    render(){
        const {routes,pathName} = this.props;
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
                        visitedItems.push(history);
                    }
                }
            })
        }

        //push to history if its finall page AND it isnt first page
        Object.keys(history).length !== 0 && this.props.saveToHistory ? historyActions.pushHistory(history) : false;

        return(
            <div className="entirePage">
                <div id="menuOpenButton" onClick={this.updateShow.bind(this)}>
                    <img src={openMenu} id="menuButton" height="40px" width="40px" />
                </div>
                <MenuTopOptions update={this.updateShow.bind(this)} data={this.props.data} show={this.state.showMenu} pathName={pathName} routes={routes} />
                <TopMenu actualPage={history} obj={obj} visitedItems={visitedItems} pathArray={pathArray} />
                {pathArray.length !== 0 && history.setting ? <Options show={false} data={this.props.data} options={setting} /> : false }
            </div>
        )
    }

    updateShow(show){
        this.setState({
            showMenu: !this.state.showMenu
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

export default  Menu;