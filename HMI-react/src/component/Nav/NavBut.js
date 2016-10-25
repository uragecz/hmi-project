/**
 * Created by urunzl on 22.8.2016.
 */
import React,{Component} from 'react';
import Nav from './Nav';

class NavBut extends Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            source: "../../assets/menu-black.png"
        }
    }
    render(){
        const {pathName, routes} = this.props;
        const pathArray = pathName.split('/').filter(e => e.length);

        let numberOfChild = 0;
        let obj = pathArray.length !== 0 ?  routes[pathArray[0]] : routes;
        if (pathArray.length !== 0){
            for ( let i = 1; i < pathArray.length; i++) {
                if (pathArray[i] === obj.children[pathArray[i]].name) {
                    obj = obj.children[pathArray[i]];
                }
            }
            Object.keys(obj.children).map(function (item) { //have any children
                    numberOfChild = (Object.keys(obj.children[item].children).length);
                }
            );
        }

        return(
            <div className="navigation">
                <div className="navShow">
                    <img id="openNav" onClick={this.handleClick.bind(this)} src={this.state.source}/>
                </div>
                {this.state.clicked ? <Nav pathArray={pathArray} routes={obj}/> : false}
                {numberOfChild === 0 && pathArray.length !== 0 ?
                    <div className="leftMenu">
                        necoProste
                    </div>
                :false
                }
             </div>
        )
    }

    handleClick(){
        this.setState({
            clicked: !this.state.clicked,
            source: this.state.clicked? "../../assets/menu-black.png" : "../../assets/menu-yell.png"
        })
    }
}

export default NavBut;