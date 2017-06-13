import React, { Component } from 'react'

class ListItem extends Component {
    constructor (props) {
        super(props)
        this.state = ({
             index: this.props.index
        })
    }
    
    render () {
        let arr = [];
        let counter = -1;
        if( typeof this.props.items === "string" )
            arr[0] = this.props.items;
        else
            arr = this.props.items;
        return (
           <tr className={"option-listItem " + (this.props.active === this.props.index ? "active" : "false")} onClick={this.handleClick.bind(this)}>
               {arr.map(function(item){
                   counter++;
                   return(
                       <td className={this.props.type[counter]}>{item}</td>
                   )
            },this)}
           </tr>
        )
    }

    handleClick(e){
        this.props.changeIndex(this.state.index);
    }
}

export default ListItem