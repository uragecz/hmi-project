/**
 * Created by urunzl on 4.10.2016.
 */
import React,{Component} from 'react';
import './List.css';
import ListItem from './ListItem.js';

class List extends Component{
    constructor (props) {
        super(props);
        this.state = ({
            activeIndex: this.props.item
        })
        
    }
    
    render(){
        let shift = this.props.type === "shift";
        let counter = -1;
        return(
            <div className="list">
                <div className="listTitle">
                    <h3 className="modalTitle">
                        {this.props.title}
                    </h3>
                </div>
                <table className="option-listItems" cellSpacing="0" cellPadding="0">
                    <thead>
    
                    </thead>
                    <tbody>
                        {Object(this.props.list).map(function(item){
                            counter++;
                            return(
                            <ListItem items={item}  type={shift ? ["shift number","shift name","shift from","shift to","shift date"] : ["group name"]}  index={counter} active={this.state.activeIndex} changeIndex={this.changeIndex.bind(this)}/>
                            )
                        },this)}
                    </tbody>
                    </table>
                
            </div>
        )
    }

    changeIndex(index){
        this.setState({
            activeIndex: index
        })
        this.props.updateIndex(index);
    }
}

export default List;