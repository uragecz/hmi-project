/**
 * Created by urunzl on 20.10.2016.
 */
import React,{Component} from 'react';
import NumpadModal from '../ModalWindow/NumpadModal';
import './InputList.css';

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
        const{unit, unit1, name, name1, even, modal,type} = this.props;
        return(
            <tr className={"table-row " + (!modal ? even : false)}>
                {this.state.clicked ? <td className="hidden"><NumpadModal value={this.state.active === "input1" ? this.state.value : this.state.value1}
                                                       onUpdate={this.handleClick.bind(this)} editValue={this.editValue.bind(this)}/></td>: false}
                {type.map(function(item){
                    switch(item){
                        case "name1":
                            return <td className="table-cell caption"><label key={item} className={'captionLabel'}>{name}</label></td>;
                        case "name2":
                            return <td className="table-cell caption"><label key={item} className={'captionLabel2'}>{name1}</label></td>;
                        case "unit1":
                            return <td className="table-cell unit"><label key={item} className={'unitLabel'}>{unit}</label></td>;
                        case "unit2":
                            return <td className="table-cell unit"><label key={item} className={'unitLabel'}>{unit1}</label></td>;
                        case "input1":
                            return <td className="table-cell input"><input key={item} disabled={!this.state.enable} className={this.state.active === item ? 'textInput active' : 'textInput'} onClick={this.handleClick.bind(this,item)}
                                              value={this.state.value} type="text"/></td>;
                        case "input2":
                            return <td className="table-cell input"><input key={item} disabled={!this.state.enable} className={this.state.active === item ? 'textInput active' : 'textInput'} onClick={this.handleClick.bind(this,item)}
                                              value={this.state.value1} type="text"/></td>;
                        case "box":
                            return <td className="table-cell box"><input key={item} className={'boxInput'} onChange={this.toggleChange.bind(this)} checked={this.state.enable}  type="checkbox"  ref="box"/></td>;
                        default:
                            break;
                        }
                    },this)}
            </tr>
        )
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
        this.props.changeValue(null,null,!this.state.enable,this.props.inputKey);
    }

    editValue(value) {
        if(this.state.active === "input1") {
            this.setState({
                value: value,
                clicked: false,
                active: false
            });
            this.props.changeValue(this.props.name,value,this.state.enable,this.props.inputKey);
        }
        else {
            this.setState({
                value1: value,
                clicked: false,
                active: false
            });
            this.props.changeValue(this.props.name1,value,this.state.enable,this.props.inputKey);
        }
    }
}

export default Input;