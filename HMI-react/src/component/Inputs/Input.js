/**
 * Created by urunzl on 7.9.2016.
 */
import NumpadModal from '../ModalWindow/NumpadModal';
import React from 'react';

class Input extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            isChecked: true,
            value: '0',
            clicked: false
        };
    };

    shouldComponentUpdate(nextProps,nextState){
        return nextState.value !== this.state.value || this.state.isChecked !== nextState.isChecked || this.state.clicked !== nextState.clicked
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            value: nextProps.inputValue,
            isChecked: nextProps.disable
        })
    }

    editValue(value){
        this.setState({
            value: value,
            clicked: false
        });
        this.props.update(value,this.props.caption,this.state.isChecked);
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }

    handleClick(value){
        this.setState({
            clicked: value
        })
    }

    toggleChange(){
        this.setState({
            isChecked: !this.state.isChecked
        });
        this.props.update(this.state.value,this.props.caption,!this.state.isChecked);
    }

    render(){
        return(
            <div className={'input-root'}>
                <div className={'input-container'}>
                    {this.state.clicked && this.props.modal ? <NumpadModal onUpdate={this.handleClick.bind(this)} value={this.state.value} editValue={this.editValue.bind(this)}/>  : false}
                    <label className={'captionLabel'}>{this.props.caption}</label>
                    <input className={this.props.modal? 'modalTextInput': 'textInput'} onClick={this.handleClick.bind(this,true)} onChange={this.handleChange.bind(this)}
                           value={this.state.value} disabled={!this.state.isChecked} type="text" ref="inp" />
                    <label className={'unitLabel'}>{this.props.unit}</label>
                    <input className={'boxInput'} checked={this.state.isChecked} onChange={this.toggleChange.bind(this)} type="checkbox"  ref="box"/>
                </div>
            </div>
        )
    }
}
Input.propTypes = {
    unit: React.PropTypes.string.isRequired,
    caption: React.PropTypes.string.isRequired,
    modal: React.PropTypes.bool,
    inputValue: React.PropTypes.string,
    update: React.PropTypes.func,
    disable: React.PropTypes.bool,
};

export default Input;