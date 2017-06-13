import React, { Component } from 'react'

class Column extends Component {
    render () {
        let top = this.props.height <= 400
        return (
             <rect fill="#a7b7bd" x={this.props.x} y={top? 0 : this.props.height} width={this.props.width} height={top? this.props.height : 550 - this.props.height}></rect>
        )
    }

    shouldComponentUpdate(nextProps){
        return (this.props.x !== nextProps.x) || (this.props.width !== nextProps.width) || (this.props.height !== nextProps.height);
    }
}

export default Column