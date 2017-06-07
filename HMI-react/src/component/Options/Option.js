/**
 * Created by urunzl on 3.10.2016.
 */
import setGroup from '../../../assets/group.png';
import setShift from '../../../assets/shift.png';
import setUnit from '../../../assets/ClearerService.png';
import React,{Component} from 'react';
import optionsPosition from './optionsPosition';

var downTimer;
var touchClick = false;

class Option extends Component{
    render(){
        const { fromAngle, angle, outerSize, activeItem, mobile, center, type, value, count } = this.props;
        const lineWidth = !mobile ? 1 : 0;
        let prevAngleRadians = -fromAngle * (Math.PI / 180.0);
        let prevX = center + (outerSize * Math.cos(prevAngleRadians));
        let prevY = center + (outerSize * Math.sin(prevAngleRadians));
        let angleInRadians = -angle * (Math.PI / 180.0);
        let x = center + (outerSize * Math.cos(angleInRadians));
        let y = center + (outerSize * Math.sin(angleInRadians));

        return(
            <g onClick={this.props.changeActive.bind(this,this.props.type).bind(this)} onTouchStart={this.handleTouchStart.bind(this)} onTouchEnd={this.handleTouchEnd.bind(this)} onMouseUp={this.handleMouseUp.bind(this)} onMouseDown={this.handleMouseDown.bind(this)}>
                <path fill={activeItem ? "rgb(36,76,90)" : "white"} stroke="#d3dbde" strokeWidth={mobile ? "0" : "1"}
                    d={"M"+center+"," +center+ " L" +prevX.toFixed(2)+ ", " +prevY.toFixed(2)+ " A"+outerSize+","+outerSize+" 0 0,1 "+x+" "+y+", z"} >
                </path>
                <image href={type === 'shift' ? setShift : type === 'group' ? setGroup : setUnit} x={optionsPosition[type][activeItem].imgX[count-1]} y={optionsPosition[type][activeItem].imgY[count-1]}  height="35px" width="35px"/>
                <text x={optionsPosition[type][activeItem].txtX[count-1]} y={optionsPosition[type][activeItem].txtY[count-1]} fontFamily="Arial" fontSize="16" strokeWidth="0.5" textAnchor="middle" stroke={activeItem? "white" : "black"} fill={activeItem? "white" : "black"}>{type === "shift" ? activeItem ? "2" : "current" : value}
                </text>
                {type === "shift"? <line x1={(center)+lineWidth} y1={(center)-lineWidth} x2={x-lineWidth} y2={y+lineWidth} stroke={mobile? "#e2ea66" : "#d3dbde"} strokeWidth={"8"} /> : false}
                {activeItem && type !== "shift" ? 
                    <g>
                        <svg x={optionsPosition[type][activeItem].plusX[count-1]} y={optionsPosition[type][activeItem].plusY[count-1]} fill="rgba(36, 76, 90, 0.7)" stroke={"white"} strokeWidth="2" onClick={this.props.changeValue.bind(this,'+',type)}>
                            <rect x="-5" y="-5" width="40" height="40" strokeWidth="0" fill="transparent"/>
                            <path d="M7 15 L23 15" />
                            <path d="M15 7 L15 23" />
                        </svg>
                        <svg x={optionsPosition[type][activeItem].minusX[count-1]} y={optionsPosition[type][activeItem].minusY[count-1]} fill="rgba(36, 76, 90, 0.7)" stroke={"white"} strokeWidth="2" onClick={this.props.changeValue.bind(this,'-',type)}>
                            <rect x="-5" y="-5" width="40" height="40" strokeWidth="0" fill="transparent"/>
                            <path d="M7 15 L23 15" />
                        </svg>
                    </g>
                : false
                }
            </g>
        )
    }

    handleTouchStart(e){
        clearTimeout(this.downTimer);
        downTimer = setTimeout(()=>  {
            touchClick = true;
            this.props.openItem(this.props.type);
        }, 300);
    }

    handleTouchEnd(e){
        clearTimeout(downTimer);
        touchClick ? e.preventDefault() : false; //because of modalList/Numpad dissaperring
        touchClick = false;
    }

    handleMouseUp(){
        clearTimeout(downTimer);
    }

    handleMouseDown(){
        clearTimeout(this.downTimer);
        downTimer = setTimeout(()=>  {
            this.props.openItem(this.props.type);
        }, 300);
    }
}

export default Option;