/**
 * Created by urunzl on 17.10.2016.
 */
//components/stores/actions
import React,{Component} from 'react';
import {Link} from 'react-router';
import routes from '../../route/routes';
import Toolbar from '../Toolbar/Toolbar';

//styles/icons
import './Menu.css';
import arrowDown from '../../../assets/arrow-down.png'

class TopMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            showedObject : null,
            activeItem : null
        }
    }

    render(){
        const {visitedItems, pathArray, obj} = this.props;
        let counter = -1;
        let counterA = -1;
        return(
            <div id="header">
            <div className={"topMenu level-" + visitedItems.length }>
                {visitedItems.map(function (item){
                    let model = item;
                    let activeItem = pathArray[pathArray.length-1] === model.name;
                    counter++;
                    if (model.name !== pathArray[pathArray-1]){
                        return(
                            <div key={model.name} className={"topMenuItem active level-"+counter + " " + (activeItem? "actual" : "")} onClick={this.showSubMenu.bind(this,model)}>
                                {counter !== 0 ?
                                    <div className="arrowLeft">
                                        <svg width={20} height={70}>
                                            <polygon className={"topMenuPolygon level-"+(counter-1)} fill="white" stroke="none" strokeWidth="1" points="0,0 20,35 0,70"/>
                                        </svg>
                                    </div>
                                    : false
                                }
                                <div className="topMenuIcon">
                                    <Link key={item} to={model.hash} onClick={e => e.preventDefault()} className="menuLink">
                                        <img src={model.icon} className="topIcons" height="40px" width="40px"/>
                                        {model.name.toUpperCase()}
                                    </Link>
                                </div>

                                <div className={"menuIcon " + (this.state.activeItem === model)}>

                                </div>
                                {this.state.activeItem === model ?
                                    <div className="subTop">
                                        <div id="arrowDown">
                                           <img src={arrowDown} height={23} width={23}/>
                                        </div>
                                        <div className={"subTopMenu level-"+counter}>
                                            {Object.keys(this.state.showedObject).map(function(item){
                                            let model = this.state.showedObject[item];
                                            return(
                                                <div className="subTopMenuItem">
                                                    <Link key={item} to={model.hash} className="menuLink">
                                                        <img src={model.icon} className="topIcons" height="40px" width="40px"/>
                                                        {model.name.toUpperCase()}
                                                    </Link>
                                                </div>
                                            )
                                        },this)}
                                        </div>
                                    </div>
                                    :false}
                            </div>
                        )
                    }
                },this)}
                {Object.keys(obj).map(function (item) {
                    let model = obj[item];
                    counterA++;
                    let activeItem = pathArray[pathArray.length-1] === model.name;
                    return(
                        <div key={model.name} className={ "topMenuItem finalItem item-"+(counter+1) + " " + (activeItem? "actual" : "")}>
                            {counterA === 0 && counter !== -1 ? <div className="arrowLeft">
                                <svg width={20} height={70}>
                                    <polygon className={"topMenuPolygon level-"+counter} fill="white" stroke="none" strokeWidth="1" points="0,0 20,35 0,70"/>
                                    {counterA === 0 && !activeItem ?<polygon className={"smallPolygon"} fill="#e2ea66" stroke="none" strokeWidth="1" points="0,70 0,62 4.5,62"/> : false}
                                </svg>
                            </div> : false}
                            <div className="topMenuIcon">
                                <Link key={item} to={model.hash} className="menuLink">
                                    <img src={model.icon} height="40px" className="topIcons" width="40px"/>
                                    <div className="topMenuText">
                                        {model.name.toUpperCase()}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                },this)}
            </div>
                <Toolbar actualPage={this.props.actualPage}/>
            </div>
        )
    }

    showSubMenu(i){
        let showSub = null;
        let obj = routes;

        this.props.pathArray.map(function (item) {
            if (obj[item].name === item) {
                if (obj[item] === i)
                    showSub = obj;
                if ( Object.keys(obj[item].children).length !== 0)
                    obj = obj[item].children;
            }
        });

        if(showSub === this.state.showedObject)
            this.setState({showedObject: null, activeItem: null});
        else
            this.setState({showedObject : showSub, activeItem: i});
    }
}

export default TopMenu;

