/**
 * Created by urunzl on 12.9.2016.
 */
import React,{Component} from 'react';
import {Link} from 'react-router';
import OptionMenu from './OptionMenu';
import openMenu from '../../../assets/menu.png';
import Options from '../Options/Options';
import historyActions from '../../actions/historyActions';

class MenuOption extends Component{
    constructor(props) {
        super(props);
        this.state = {
            xPos : [0, 30, 20, 15],
            yPos : [0, 145, 55, 62],
            xRot : [0, 68, 50, 40],
            yRot : [0, 182, 80, 90],
            showOpt: false,
            prevAngleInRadians: null,
            previousX: null,
            previousY: null,
        };
    }

    componentWillMount(){
        let prevAngle = -180 * (Math.PI / 180.0);
        let prevX = 125 + (125 * Math.cos(prevAngle));
        let prevY = 125 + (125 * Math.sin(prevAngle));
        this.setState({
            prevAngleInRadians : prevAngle,
            previousX: prevX,
            previousY: prevY
        })
    }

    render(){
        const {routes,pathName, width} = this.props;
        const pathArray = pathName.split("/").filter(e => e.length);
        let obj = this.props.routes;
        let setting = null;
        let history = {};

        if (pathArray.length !== 0 ){
            // eslint-disable-next-line
            pathArray.map(function (item) {
                if (obj[item].name === item){
                    setting = obj[item].setting;
                    history = obj[item];
                    //assign to object siblings if object doesnt have any childrens
                    obj = Object.keys(obj[item].children).length !== 0 ? obj[item].children: obj;
                }
            })
        }
        //push to history if its finall page AND it isnt first page
        Object.keys(history).length !== 0 && this.props.saveToHistory ? historyActions.pushHistory(history) : false;

        let length = Object.keys(obj).length;
        let posAngle = -(180/length);
        let angleInRadians = -(180 + posAngle) * (Math.PI / 180.0);
        let x = width + (width * Math.cos(angleInRadians));
        let y = width + (width * Math.sin(angleInRadians));
        let angle = -posAngle;

        return(
            <div id="menuOpen" className={this.state.showOpt ? "entireMenu open" : "entireMenu close"}>
                <OptionMenu update={this.updateShow.bind(this)} data={this.props.data} show={this.state.showOpt} pathName={pathName} routes={routes} />
                <div className="bottomMenu">
                    <svg id="svgMenuOpen" className="bottomMenu" width={252} height={252} >
                        <g width={252} transform="rotate( 0 125 125)" id="bottomMenuRotate" >
                        {Object.keys(obj).map(function (item) {
                            let model = obj[item];
                            let activeItem = pathArray[pathArray.length-1] === model.name;
                            posAngle += angle;
                            return(
                                <Link key={item} to={model.hash} transform={"rotate("+ posAngle +",125 125)"} className="menuLink">
                                    <path fill={activeItem ? "rgb(36,76,90)" : "white"} stroke="rgba(0,0,0,0.1)" strokeWidth="2" d={"M"+width+","+width+" L"+this.state.previousX+", "+this.state.previousY+" A"+width+","+width+" 0 0,1 "+x+", "+y+" z"}>
                                    </path>
                                    <image transform={"rotate(-"+ posAngle +" "+this.state.xRot[length-1]+ " "+ this.state.yRot[length-1] +")"} href={model.icon} x={this.state.xPos[length-1]} y={this.state.yPos[length-1]}  height="50px" width="50px"/>
                                    <text  transform={"rotate(-"+ posAngle +" "+this.state.xRot[length-1]+ " "+ this.state.yRot[length-1] +")"} textAnchor="end" x={this.state.xPos[length-1]+45} y={this.state.yPos[length-1]+58} fontFamily="sans-serif" fontSize="16px" fill={activeItem ? "white" : "black"}>{model.value}
                                    </text>
                                </Link>
                            )
                        },this)}
                        </g>
                        <circle cx="125" cy="125" r="50" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="white" onClick={this.updateShow.bind(this,!this.state.showOpt)}/>
                        <image href={openMenu} id="menuButton"  x="100" y="90" height="50px" width="50px" onClick={this.updateShow.bind(this,!this.state.showOpt)}/>

                    </svg>
                </div>
                {pathArray.length !== 0 && history.setting ? <Options show={false} data={this.props.data} options={setting} /> : false }
            </div>
        )
    }

/*
    selectElement(e){
        let move = false;
        let w = window.innerWidth/2;
        let h = window.innerHeight;
        let groupRotate = document.getElementById('bottomMenuRotate');
        let startRadius = Math.atan2(e.clientY - h, e.clientX - w );
        let actualRadius = groupRotate.getAttribute("transform").split(' ');
        groupRotate.onmousemove = function(e) {
            let currentRadius = Math.atan2(e.clientY - h, e.clientX - w );
            let different = startRadius - currentRadius;
            let newRadius = parseFloat(actualRadius[1]) - (different * (180 / Math.PI));
            groupRotate.setAttributeNS(null, "transform", "rotate( "+newRadius+" 125 125)");
            move = true;
        };

        groupRotate.onclick = function(e){
            // eslint-disable-next-line
            move ? e.preventDefault() : false;
        };

        groupRotate.onmouseup = function(e){
            groupRotate.onmousemove = null;

        };

        groupRotate.onmousout = function(e){
            groupRotate.onmousemove = null;

        };
    }
*/

    updateShow(showP){
        this.setState({
            showOpt: showP
        });
        this.props.goBack();
    }
}

export default MenuOption;

/*
 onMouseDown={this.selectElement.bind(this)} onTouchStart={this.selectElement.bind(this)}
 */