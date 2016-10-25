/**
 * Created by urunzl on 20.10.2016.
 */
import React,{Component} from 'react';
import Input from './Input';
import ModalWin from '../ModalWindow/ModalWin';
import './InputList.css';

class InputList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        }
    }

    render(){
        const{checkBox, modal, list, descTitle} = this.props;
        return(
            <div className={this.props.modal? 'modalInputs-root': 'inputs-root'}>
                <div className={'inputs-container'} onClick={!modal ? this.handleClick.bind(this,true) : false} >
                    <div className="inputs-description">
                        {descTitle}
                    </div>
                    <div className={ modal ? "inputList" : "inputList disable"}>
                        {Object.keys(list).map(function (item) {
                            let model = list[item];
                            return(
                                <Input key={item} changeValue={this.changeValue.bind(this)} checkBox={checkBox} name={item} value={model.value} unit={model.unit}/>
                            )
                        },this)}
                    </div>
                </div>
                {this.state.clicked ?
                    <ModalWin save={this.saveValues.bind(this)} update={this.handleClick.bind(this)}>
                        <InputList modal={true} checkBox={checkBox} list={list} descTitle={descTitle} />
                    </ModalWin>
                    : false
                }
            </div>
        )
    }

    clone(obj) {
        var copy = {};
        if (null == obj || "object" != typeof obj) return obj;
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
        }
        return copy;
    }

    handleClick(){
        this.setState({
            clicked: !this.state.clicked
        })
    }

    changeValue(item,value){
        let oldStates = this.clone(this.props.list);
        oldStates[item].value = value;
        this.props.changeValue(oldStates);
    }

    saveValues(list){
        this.setState({
            clicked: !this.state.clicked,
        });
        this.props.save(list,this.props.descTitle);
    }
}

export default InputList;