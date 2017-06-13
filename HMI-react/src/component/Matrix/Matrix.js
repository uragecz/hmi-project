import React, { Component } from 'react'
import Grid from './Grid.js';
import Axis from './Axis.js';
import Graph from './Graph.js';
import './Matrix.css';

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 550;

class componentName extends Component {
    render () {
        return (
            <svg id="matrix" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} viewBox="-20 -40 740 640">
                <rect x={0} y={0} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill="#244c5a" stroke="black"></rect>
                <Graph />
                <rect x={350} y={350} width={210} height={50} stroke="black"fill="#b0b0b0"/>
                <rect x={0} y={300} width={350} height={100} stroke="black" fill="#b0b0b0"/>
                <rect x={0} y={400} width={350} height={150} stroke="black" fill="#b0b0b0"/>
                <rect x={350} y={400} width={210} height={50} stroke="black" fill="#b0b0b0"/>
                <rect x={0} y={300} width={70} height={100} stroke="black" fill="#b0b0b0"/>
                <Grid />
                <Axis />
                <use xlinkHref="#path" />
           </svg>
        )
    }

    componentDidMount(){
        let svg = document.getElementById("matrix");
        let matrixScale = document.getElementById(this.props.scale);
        let newScale = this.props.mobile ? (matrixScale.offsetWidth / CANVAS_WIDTH) :  (matrixScale.offsetWidth / CANVAS_WIDTH) - 0.1 ;
        let idGraph = document.getElementById("heightMatrix");
        if (newScale > 1)
            newScale = 1;
        idGraph.style.height = (CANVAS_HEIGHT * newScale) + "px";
         svg.style.transform = 'scale('+newScale+')';
    }

    shouldComponentUpdate (nextProps, nextState) {
        return false;
    }
}

export default componentName