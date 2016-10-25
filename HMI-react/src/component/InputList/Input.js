/**
 * Created by urunzl on 20.10.2016.
 */
import React,{Component} from 'react';
import NumpadModal from '../ModalWindow/NumpadModal';

class Input extends Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            value: this.props.value
        }
    }

    render(){
        const{unit, name, checkBox, even, modal} = this.props;
        return(
            <div className={'input-root ' + (!modal ? even : false)}>
                <div className={'input-container'}>
                    {this.state.clicked ? <NumpadModal onUpdate={this.handleClick.bind(this)} value={this.state.value} editValue={this.editValue.bind(this)}/>  : false}
                    <label className={'captionLabel'}>{name}</label>
                    <input className={'textInput'} onClick={this.handleClick.bind(this,true)} onChange={this.handleChange.bind(this)}
                           value={ this.state.value } type="text"/>
                    <label className={'unitLabel'}>{unit}</label>
                    {checkBox ? <input className={'boxInput'} onChange={this.toggleChange.bind(this)} type="checkbox"  ref="box"/> : false}
                </div>
            </div>
        )
    }

    componentWillReceiveProps (nextProps){
        this.setState({
            value: nextProps.value
        })
    }

    handleClick(){
        this.setState({
            clicked: !this.state.clicked
        })
    }

    toggleChange(){

    }

    handleChange(){

    }

    editValue(value) {
        this.setState({
            value: value,
            clicked: false
        });
        this.props.changeValue(this.props.name,value);
    }

}

export default Input;