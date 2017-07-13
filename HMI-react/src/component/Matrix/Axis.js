import React, { Component } from 'react'

class Axis extends Component {
    render () {
        const yAxis = ["200","120","100","80","60","40","20","0","0","-20","-30"];
        const xAxis = ["1","2","3","5","8","16","32","200","1000"];
        let xArr = [];
        let yArr = [];
        let x = -2;
        let y = 4;
        for (let i = 0; i< xAxis.length; i++){
            x += 70;
            xArr.push(<text key={i} x={x} y={-15} fontSize={"normal"} textAnchor="middle">{xAxis[i]}</text>)
            if (i > 3)
                xArr.push(<text key={'b'+i} x={x} y={578} fontSize={"normal"} textAnchor="middle">{xAxis[i]}</text>)
        }
        for (let j = 0; j< yAxis.length; j++){
             y = j === 8 ? y  : y + 50
            yArr.push(<text key={j} x={j < 8 ? -20 : 740} y={y} fontSize={"normal"} textAnchor="end">{yAxis[j]}</text>)
        }
        return (
           <g  id="axis">
                <g className="x-axis">
                    {xArr}
                    <text x={700} y={-16} fontSize={"normal"} textAnchor="end">[cm]</text>
                    <text x={700} y={577} fontSize={"normal"} textAnchor="end">[cm]</text>
                </g>
                <g className="y-axis plus">
                    <text x={-20} y={10} fontSize={"normal"} textAnchor="end">[%]</text>
                    {yArr}
                    <text x={740} y={550} fontSize={"normal"} textAnchor="end">[%]</text>
                </g>
                <g className="mid-axis" fill="rgb(130,133,136)">
                    <path d="M0 400 L10 390 L60 390 L70 400 L60 410 L10 410 Z" />
                    <path d="M70 400 L80 390 L340 390 L350 400 L340 410 L80 410 Z" />
                    <path d="M350 400 L360 390 L550 390 L560 400 L550 410 L370 410 Z" />
                    <path d="M560 400 L570 390 L620 390 L630 400 L620 410 L570 410 Z" />
                    <path d="M630 400 L640 390 L690 390 L700 400 L690 410 L640 410 Z" />
                </g>
                <g className="mid-axis letters" fill="rgb(193,194,195)" textAnchor="middle" fontSize="normal">
                    <text x={35} y={405}>N</text>
                    <text x={205} y={405}>S</text>
                    <text x={460} y={405}>L/T</text>
                    <text x={595} y={405}>SL</text>
                    <text x={665} y={405}>C</text>
                </g>
           </g>
        )
    }
    shouldComponentUpdate (nextProps, nextState) {
        return false;
    }
    
}

export default Axis