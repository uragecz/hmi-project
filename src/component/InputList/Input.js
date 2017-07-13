/**
 * Created by urunzl on 20.10.2016.
 */
import React,{Component} from 'react';
import NumpadModal from '../ModalWindow/NumpadModal';
import './InputList.css';

/* eslint-disable */

class Input extends Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            value: this.props.value,
            value1: this.props.value1,
            active: null,
            enable: this.props.enable == undefined ? true : this.props.enable
        };
    }

    render(){
        const{even, modal, type} = this.props;
        return(
            <tr className={"table-row " + (!modal ? even : false)}>
                {this.state.clicked ? <td className="hidden"><NumpadModal left="85%" value={this.state.active === "input1" ? this.state.value : this.state.value1}
                                                       onUpdate={this.handleClick.bind(this)} editValue={this.editValue.bind(this)} name={this.props.name + "["+ (this.state.active === "input1" ? this.props.unit1 : this.props.unit2) +"]"}/> </td>: false}
                {type.map(function(item){
                    switch(item){
                        case "name":
                            return <td key={item} className="table-cell caption"><label key={item} className={'captionLabel'}>{this.props.name}</label></td>;
                        case "number1":
                            return <td key={item} className="table-cell number"><label key={item} className={'captionLabel'}>{this.props.value}</label></td>;
                        case "number2":
                            return <td key={item} className="table-cell number"><label key={item} className={'captionLabel'}>{this.props.value1}</label></td>;
                        case "number3":
                            return <td key={item} className="table-cell number"><label key={item} className={'captionLabel'}>{this.props.value2}</label></td>;
                        case "unit1":
                            return <td key={item} className="table-cell unit"><label key={item} className={'unitLabel'}>{this.props.unit1}</label></td>;
                        case "unit2":
                            return <td key={item} className="table-cell unit"><label key={item} className={'unitLabel'}>{this.props.unit2}</label></td>;
                        case "input1":
                            return <td key={item} className={"table-cell input" + (this.state.active === "input1" ? " active" : "")}><input readOnly="true" key={item} disabled={!this.state.enable} onChange={this.handleChange.bind(this)} className={this.state.active === item ? 'textInput active' : 'textInput'} onClick={this.handleClick.bind(this,item)}
                                              value={this.state.value} type="text"/></td>;
                        case "input2":
                            return <td key={item} className={"table-cell input" + (this.state.active === "input2" ? " active" : "") }><input readOnly="true" key={item} disabled={!this.state.enable} onChange={this.handleChange.bind(this)} className={this.state.active === item ? 'textInput active' : 'textInput'} onClick={this.handleClick.bind(this,item)}
                                              value={this.state.value1} type="text"/></td>;
                        case "box":
                            return <td key={item} className="table-cell box"><input key={item} className={'boxInput'} onChange={this.toggleChange.bind(this)} checked={this.state.enable}  type="checkbox"  ref="box"/></td>;
                        default:
                            break;
                        }
                    },this)}
            </tr>
        )
    }

    handleChange(){

    }

    componentWillReceiveProps (nextProps){
        this.setState({
            value: nextProps.value,
            value1: nextProps.value1,
            enable: nextProps.enable == undefined ? true : nextProps.enable
        });
    }

    handleClick(active){
        this.setState({
            clicked: !this.state.clicked,
            active: active
        })
    }

    toggleChange(){
        this.setState({
            enable: !this.state.enable
        });
        this.props.changeValue(this.props.name,null,!this.state.enable);
    }

    editValue(value) {
        if(this.state.active === "input1") {
            this.setState({
                value: value,
                clicked: false,
                active: false
            });
        }
        else {
            this.setState({
                value1: value,
                clicked: false,
                active: false
            });
        }
        this.props.changeValue(this.props.name,value, this.state.enable, this.state.active === 'input1' ? this.props.firstId : this.props.secondId);
    }
}

export default Input;