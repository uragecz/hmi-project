/**
 * Created by urunzl on 3.10.2016.
 */
import setGroup from '../../../assets/group.png';
import setShift from '../../../assets/shift.png';
import setUnit from '../../../assets/ClearerService.png';
import React,{Component} from 'react';

class Option extends Component{
    shouldComponentUpdate(nextProps, nextState ){
        return this.props.previousX !== null;
    }
    render(){
        const { posAngle, previousX, previousY, x, y, xPos, yPos, xRot, yRot, type,  activeItem} = this.props;
        return(
            <g transform={"rotate("+ posAngle +",125 125)"} onClick={this.handleClick.bind(this)}>
                <path fill={activeItem ? "rgb(36,76,90)" : "white"} stroke="rgba(0,0,0,0.1)" strokeWidth="2"
                      d={"M125,125 L" +previousX+ ", " +previousY+ " A100,100 0 0,1 " +x+ ", " +y+ " z"} >
                </path>
                <image transform={"rotate(-"+posAngle+" "+ xRot + " " + yRot + ")"}
                       href={type === 'shift' ? setShift : type === 'group' ? setGroup : setUnit} x={xPos} y={yPos}  height="35px" width="35px"/>
            </g>
        )
    }

    handleClick(){
        this.props.update(this.props.type);
    }
}

export default Option;