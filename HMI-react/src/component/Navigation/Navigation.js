/**
 * Created by urunzl on 29.7.2016.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import './Navigation.css';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


class Navigation extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.pathName !== this.props.pathName);
    }

    componentWillUnmount(){
        console.log('unmount');
    }

    render() {
        const {pathName, routes, index} = this.props;
        const pathArray = pathName.split("/").filter(e => e.length);
        let numberOfChild = 0;

        Object.keys(routes).map(function (item) {
            if (routes[item].name === pathArray[index])
                numberOfChild = (Object.keys(routes[item].children).length);
        });

        return (
            <div className={"navigation-list-" + (index === 0 ? "main" : "sub-" + (numberOfChild === 0 || pathArray[pathArray.length - 2] === pathArray[index]))}>
                {Object.keys(routes).map(function (item) {
                    let model = routes[item];
                    return (
                        <div key={item} className={"navigation-item-active"}>
                            <div className={"active-button-" + (pathArray[index] === model.name)}>

                                <Link key={model.hash} to={model.hash} className="navigation-link">
                                    {model.value}<img src={model.icon}
                                                      className={"icon" + (index === pathArray.length ? " active" : "")}/>
                                </Link>
                            </div>
                            {((pathArray[index] === model.name) && (Object.keys(model.children).length !== 0)) ?
                                <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500}  transitionLeaveTimeout={500}>
                                    <Navigation key={model.hash} index={index + 1} routes={model.children} pathName={pathName}/>
                                </ReactCSSTransitionGroup>: false
                            }
                        </div>
                    )
                })}
            </div>
        )

    }
}

Navigation.PropTypes={
    pathName: React.PropTypes.string,
    routes: React.PropTypes.object,
    index: React.PropTypes.number
};

export default Navigation;
