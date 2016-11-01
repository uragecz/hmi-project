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
            active: null
        }
    }

    render(){
        const{unit, unit1, name, name1, even, modal,type} = this.props;
        return(
            <div className={'input-root ' + (!modal ? even : false)}>
                <div className={'input-container'}>
                    {this.state.clicked ? <NumpadModal value={this.state.active === "value" ? this.state.value : this.state.value1}
                                                       onUpdate={this.handleClick.bind(this)} editValue={this.editValue.bind(this)}/>: false}
                    {type.map(function(item){
                        switch(item){
                            case "name1":
                                return <label key={item} className={'captionLabel'}>{name}</label>;
                            case "name2":
                                return <label key={item} className={'captionLabel2'}>{name1}</label>;
                            case "unit1":
                                return <label key={item} className={'unitLabel'}>{unit}</label>;
                            case "unit2":
                                return <label key={item} className={'unitLabel'}>{unit1}</label>;
                            case "input1":
                                return <input key={item} className={'textInput'} onClick={this.handleClick.bind(this,"value1")} onChange={this.handleChange.bind(this)}
                                              value={this.state.value} type="text"/>;
                            case "input2":
                                return <input key={item} className={'textInput'} onClick={this.handleClick.bind(this,"value2")} onChange={this.handleChange.bind(this)}
                                              value={this.state.value1} type="text"/>;
                            case "box":
                                return <input key={item} className={'boxInput'} onChange={this.toggleChange.bind(this)} type="checkbox"  ref="box"/>;
                            default:
                                break;
                        }
                    },this)}
                </div>
            </div>
        )
    }

    componentWillReceiveProps (nextProps){
        this.setState({
            value: nextProps.value,
            value1: nextProps.value1
        });

    }

    handleClick(active){
        this.setState({
            clicked: !this.state.clicked,
            active: active
        })
    }

    toggleChange(){

    }

    handleChange(){

    }

    editValue(value) {
        if(this.state.active === "value1") {
            this.setState({
                value: value,
                clicked: false
            });
            this.props.changeValue(this.props.name,value);
        }
        else {
            this.setState({
                value1: value,
                clicked: false
            });
            this.props.changeValue(this.props.name1,value);
        }
    }
}

export default Input;