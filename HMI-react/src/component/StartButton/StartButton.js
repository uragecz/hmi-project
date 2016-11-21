/**
 * Created by urunzl on 21.11.2016.
 */
import React,{Component} from 'react';
import './StartButton.css';
import powerButton from '../../../assets/power-button.png';

class StartButton extends Component{
    render(){
        const {groups} = this.props;
        let count = Object.keys(groups).length;
        const width= [84,42,28,42,28,28,21,21];
        const height= [40,40,40,20,20,20,20,20];
        let x = 41 -(width[count-1]);
        let y = 0;
        return(
            <svg id="svg-startButton">
                <rect x="0" y="0" width="41" height="40" fill="#e2ea66" strokeWidth="1"/>
                <image href={powerButton} x={7} y={7} width={27} height={26} />
                {Object.keys(groups).map(function(item){
                    let modelStatus = groups[item].status;
                    console.log(height[count-1],width[count-1],count);
                    x += width[count-1];
                    if (x >= 125 && y < 20){
                        console.log(x,'if');
                        x = 41;
                        y = 20;
                    }
                    return(
                        <rect x={x} y={y} width={width[count-1]} height={height[count-1]} fill={modelStatus ? "rgb(80, 112, 123)" : "rgb(226, 77, 77)"} strokeWidth="1" stroke="#d3dbde"/>
                    )
                })}
            </svg>
        )
    }
}

export  default StartButton
