/**
 * Created by urunzl on 7.10.2016.
 */
import React,{Component} from 'react';
import {Link} from 'react-router';

class FavouriteHistory extends Component{
    constructor(props){
        super(props);
        this.state ={
            previousY : null,
            previousX : null,
            prevAngleInRadians : null,
            width: 150,
            center: 225,
            xPos: [200,290,275,270,252,250],
            yPos: [290,200,145,125,115, 110],
            xRot: [0,320,305,295,280,275],
            yRot: [0,225,177,160,150,140]
        }
    }

    componentWillMount(){
        let prevAngle = -90 * (Math.PI / 180.0);
        let prevX = 225 + (this.state.width * Math.cos(prevAngle));
        let prevY = 225 + (this.state.width * Math.sin(prevAngle));
        this.setState({
            prevAngleInRadians : prevAngle,
            previousX: prevX,
            previousY: prevY
        })
    }

    render(){
        const {list} = this.props;
        let length = Object.keys(list).length;
        let posAngle = -(360/length);
        let angleInRadians = -(90 + posAngle) * (Math.PI / 180.0);
        let x = 225 + (this.state.width * Math.cos(angleInRadians));
        let y = 225 + (this.state.width * Math.sin(angleInRadians));
        let angle = -posAngle;
        return(
            <div className="favouriteHistory">
                <svg id="favouriteHistorySVG" width={452} height={452} >
                        {Object.keys(list).map(function (item) {
                            let model = list[item];
                            posAngle += angle;
                            return(
                                <Link key={item} to={model.hash} transform={"rotate("+ posAngle +","+this.state.center+" "+this.state.center+")"} className="menuLink">
                                    {length !== 1 ? <path fill={"white"} stroke="rgba(0,0,0,0.1)" strokeWidth="2" d={"M"+this.state.center+","+this.state.center+" L"+this.state.previousX+", "+this.state.previousY+" A"+this.state.width+","+this.state.width+" 0 0,1 "+x+", "+y+" z"}>
                                    </path> : <circle cx={this.state.center} cy={this.state.center} r="150" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="white" />}
                                    <image href={model.icon} transform={"rotate(-" +posAngle + " " +this.state.xRot[length-1] +" " +this.state.yRot[length-1] + ")"} x={this.state.xPos[length-1]} y={this.state.yPos[length-1]} height="50px" width="50px"/>
                                    <text  transform={"rotate(-" +posAngle + " " +this.state.xRot[length-1] +" " +this.state.yRot[length-1] + ")"} x={this.state.xPos[length-1]+50} y={this.state.yPos[length-1]+65} textAnchor="end" fontFamily="sans-serif" fontSize="16px" fill="black">{model.value}
                                    </text>
                                </Link>
                            )
                        },this)}
                    {this.props.current && length !== 0 ?
                        <g>
                            <path fill="none" stroke="rgb(226,234,102)" strokeWidth="4"  d="M225,20 L225,30 L225,25 A200,200 0 0,0 55, 130"></path>
                            <path fill="rgb(226,234,102)"  d="M45,125 A100,100 0 0,0 43,160 A100,100 0 0,1 70 137 A75,75 0 0,1 50,135" ></path>
                            <text  transform={"rotate(-45deg)"} x={100} y={30} textAnchor="middle" fontFamily="sans-serif" fontSize="18px" fill="rgb(226,234,102)">{this.props.current}
                            </text>
                        </g>
                    : false}

                    <circle cx={this.state.center} cy={this.state.center} r="50" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="rgb(226,234,102)" />
                    <text  textAnchor="middle" x={this.state.center} y={this.state.center} fontFamily="sans-serif" fontSize="12px" fill="black">{this.props.label}
                    </text>
                </svg>
            </div>
        )
    }
}

export default FavouriteHistory;