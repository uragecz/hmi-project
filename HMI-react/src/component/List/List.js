/**
 * Created by urunzl on 4.10.2016.
 */
import React,{Component} from 'react';
import './List.css';

class List extends Component{
    render(){
        return(
            <div className="list">
                <div className="listTitle">
                    <h3 className="modalTitle">
                        {this.props.title}
                    </h3>
                </div>
                <div className="listItems">
                    {Object.keys(this.props.list).map(function(){
                        return(
                            <div className="listItem">
                                hh
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default List;