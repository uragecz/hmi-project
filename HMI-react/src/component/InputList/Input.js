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
            <div className={'input-root ' + (!modal ? even : false)}>
                <div className={'input-container'}>
                    {this.state.clicked ? <NumpadModal value={this.state.active === "input1" ? this.state.value : this.state.value1}
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
                                return <input key={item} disabled={!this.state.enable} className={this.state.active === item ? 'textInput active' : 'textInput'} onClick={this.handleClick.bind(this,item)}
                                              value={this.state.value} type="text"/>;
                            case "input2":
                                return <input key={item} disabled={!this.state.enable} className={this.state.active === item ? 'textInput active' : 'textInput'} onClick={this.handleClick.bind(this,item)}
                                              value={this.state.value1} type="text"/>;
                            case "box":
                                return <input key={item} className={'boxInput'} onChange={this.toggleChange.bind(this)} checked={this.state.enable}  type="checkbox"  ref="box"/>;
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