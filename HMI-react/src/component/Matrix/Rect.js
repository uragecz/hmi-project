/* eslint-disable */
import React, { Component } from 'react'

class Rect extends Component {
    render () {
        let textX= this.props.x + this.props.width -5;
        let grey = this.props.id === "A1";
        let textUp = this.props.y + 15;
        let textDown = this.props.y + this.props.height - 6;
        return (
            <g className="rect" onClick={this.handleClick.bind(this)}>
                <rect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} fill={grey ? "#b0b0b0" :  "transparent"} stroke="black"></rect>
                <g className="text">
                    <text x={this.props.x+5} y={this.props.bottom && !this.props.QM_dec ? this.props.y + 62 : this.props.y+15} fill="rgb(130,133,136)" textAnchor="start">{this.props.id}</text>
                    <text x={textX} y={!this.props.bottom ? textUp : textDown} fill="rgb(232,119,34)" stroke="rgb(232,119,34)" textAnchor="end">{!grey ? this.props.QM_rem : ""}</text>
                    <text x={textX} y={!this.props.bottom ? textDown : textUp}  textAnchor="end">{!grey ? this.props.QM_dec : ""}</text>
                </g>
            </g>
        )
    }

    handleClick(){
        console.log('rect clicked');
    }
}

export default Rect