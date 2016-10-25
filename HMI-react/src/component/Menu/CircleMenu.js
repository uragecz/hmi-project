/**
 * Created by urunzl on 1.9.2016.
 */
import React,{Component} from 'react'
import { Link } from 'react-router';
import './Menu.css';
/* eslint-disable */

class CircleMenu extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return (this.props.pathName !== nextProps.pathName)
    }

    render() {
        const {pathName, routes, index, arr, width, xPosition, yPosition, from, ...others} = this.props;
        let prevAngleInRadians = -arr[from[0]-1]?  -arr[from[0]-1]* Math.PI / 180.0 :  -arr[arr.length-1]* Math.PI / 180.0;
        let x = 225 + width * Math.cos(prevAngleInRadians);
        let y = 225 + width * Math.sin(prevAngleInRadians);
        let startNum = 1;
        let counter = -1;
        let obj;
        let numberOfChild = 0;
        const pathArray = pathName.split("/").filter(e => e.length);
        Object.keys(routes).map(function (item) {
            if (routes[item].name === pathArray[index]) {
                numberOfChild = (Object.keys(routes[item].children).length);
            }
        });

        return (
                <svg id="menuOpen" className={"menuLevel " + index} width={452} height={452} >
                    {Object.keys(routes).map(function (item) {
                        counter++;
                        let model = routes[item];
                        let activeItem = pathArray[index] === model.name;
                        obj = ((activeItem) && (Object.keys(model.children).length !== 0)) ? model.children : obj;
                        startNum = activeItem ? from[counter]: startNum;
                        let angleInRadians = -arr[from[counter]] * Math.PI / 180.0;
                        let previousX =  x;
                        let previousY = y;
                        x = 225 + width * Math.cos(angleInRadians);
                        y = 225 + width * Math.sin(angleInRadians);

                        if (index === 0){
                            return(
                                <Link key={item} to={model.hash} className="menuLink">
                                    <path fill={activeItem ? "rgb(36,76,90)" : "white"} stroke="rgba(0,0,0,0.1)" strokeWidth="2" d={"M225,225 L"+previousX+", "+previousY+" A"+width+","+width+" 0 0,1 "+x+", "+y+" z"}>
                                    </path>
                                    <image href={model.icon} x={xPosition[from[counter]]} y={yPosition[from[counter]]} height="40px" width="40px"/>
                                    <text textAnchor="end" x={xPosition[from[counter]]+40} y={yPosition[from[counter]]+50} fontFamily="sans-serif" fontSize="16px" fill={activeItem ? "white" : "black"}>{model.value}
                                    </text>
                                </Link>
                            )
                        }
                        else if (index === 1){
                            return(<Link key={item} to={model.hash} className="menuLink">
                                <path fill={activeItem ? "rgb(36,76,90)" : "white"} stroke={activeItem ? "rgb(36, 76, 90)" : "rgba(0,0,0,0.1)"} strokeWidth="2" d={"M"+(((previousX-225)/2)+225) + "," + (((previousY-225)/2)+225) + " L" + previousX +", " + previousY
                                + " A150,150 0 0,1 " + x +", " + y + " L" + (((x-225)/2)+225) + "," + (((y-225)/2)+225) + " A75,75 0 0,0 " +  (((previousX-225)/2)+225) + "," + (((previousY-225)/2)+225) }>
                                </path>
                                <image href={model.icon} x={xPosition[from[counter]]} y={yPosition[from[counter]]} height="40px" width="40px"/>
                                <text textAnchor="end" x={xPosition[from[counter]]+40} y={yPosition[from[counter]]+55} fontFamily="sans-serif" fontSize="16px" fill={activeItem ? "white" : "black"}>{model.value}
                                </text>
                            </Link>)
                        }
                        else if (index === 2){
                            return(
                                <Link key={item} to={model.hash} className="menuLink">
                                    <path fill={activeItem ? "rgb(36,76,90)" : "white"} stroke="rgba(0,0,0,0.1)" strokeWidth="2" d={"M"+(((previousX-width)/1.5)+width) + "," + (((previousY-width)/1.5)+width) + " L" + previousX +", " + previousY
                                    + " A225,225 0 0,1 " + x +", " + y + " L" + (((x-width)/1.5)+width) + "," + (((y-width)/1.5)+width) + " A150,150 0 0,0 " +  (((previousX-width)/1.5)+width) + "," + (((previousY-width)/1.5)+width) }>
                                    </path>
                                    <image href={model.icon} x={xPosition[from[counter]]} y={yPosition[from[counter]]} height="40px" width="40px"/>
                                    <text textAnchor="end" x={xPosition[from[counter]]+40} y={yPosition[from[counter]]+55} fontFamily="sans-serif" fontSize="16px" fill={activeItem ? "white" : "black"}>{model.value}
                                    </text>
                                </Link>
                            )
                        }
                    },this)}
                    {obj ? index === 0 ?
                        <CircleMenu arr={[22.5,337.5,292.5,247.5,202.5,157.5,112.5,67.5]} from={this.getPositions(numberOfChild,startNum,[6,0,2,4],8)} routes={obj} index={index+1} pathName={pathName} width={width+75}
                                    xPosition={[280,310,280,200,120,90,120,200]} yPosition={[120,200,280,310,280,200,120,90]} {...others}/>
                        :
                        <CircleMenu arr={[45,15,345,315,285,255,225,195,165,135,105,75]} from={this.getPositions(numberOfChild,startNum,[1,2,4,5,7,8,10,11],12)} routes={obj} index={index+1} pathName={pathName} width={width+75}
                                    xPosition={[295,365,390,365,295,200,110,40,15,40,110,200]} yPosition={[40,105,200,290,365,385,365,290,200,105,40,15]} {...others}/>
                        : false}
                </svg>


        )
    }



    getPositions(len,from,numbs,size){
        let arr = [];
        let half = len/2;
        let num = numbs[from];
        for (let i = 0; i < Math.round(half)-1; i++){
            num = num === 0? size-1: num-1;
        }
        arr.push(num);
        for(let i= 0; i< len-1; i++){
            num = (num+1)%size;
            arr.push(num);
        }
        return arr;
    }
}

export default CircleMenu;
