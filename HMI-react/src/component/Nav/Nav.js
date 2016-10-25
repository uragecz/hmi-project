/**
 * Created by urunzl on 19.8.2016.
 */
import React,{Component} from 'react';
import { Link } from 'react-router';
import './Nav.css';

class Nav extends Component{
    render(){
        const {routes,pathArray} = this.props;
        const len = pathArray.length !== 0 ? Object.keys(routes.children).length: 0;

        let path = '';
        return(
            <div id="nav">
                <div className="navButtons">
                    <div className={len === 0 ? "navButton-active" : "navButton"}>
                        <Link key='home' to={'/'} className="navigationLink">Home</Link>
                    </div>
                    {pathArray.map(function(item){
                        path += '/' + item;
                        return(
                            item !== 'home' && item !== 'graph' ?
                                <div className={pathArray[pathArray.length-1] === item ? "navButton-active": "navButton"}>
                                    <Link key={item} to={path} className="navigationLink">{item}</Link>
                                </div> : false
                        )
                    })}
                </div>

                {pathArray.length !== 0 ?
                    <div className={"navList-sub len" + len}>
                        {Object.keys(routes.children).map(function (item) {
                            let model = routes.children[item];
                            return(
                                <div className="navRect">
                                    <div className="navItem">
                                        <Link key={model.hash} to={model.hash} className="navigationLink"> {model.value}
                                             <img src={model.icon} className="icon"/>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div> :
                    <div className="navLists">
                        {Object.keys(routes).map(function (item) {
                            let len = Object.keys(routes[item].children).length;
                            return(
                                <div className={"navList-main len" + len}>
                                {Object.keys(routes[item].children).map(function (i) {
                                    let model = routes[item].children[i];
                                    return(
                                        <div className="navRect">
                                            <div className="navItem">
                                                <Link key={model.hash} to={model.hash} className="navigationLink"> {model.value}
                                                    <img src={model.icon} className="icon"/>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }
}

Nav.propTypes = {
    routes: React.PropTypes.object,
    pathArray: React.PropTypes.array,
};

export default Nav;
