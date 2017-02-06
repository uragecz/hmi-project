/**
 * Created by urunzl on 20.10.2016.
 */
import React,{Component} from 'react';
import Input from './Input';
import ModalWin from '../ModalWindow/ModalWin';
import './InputList.css';

/* eslint-disable */

class InputList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        }
    }

    render(){
        const{modal, list, type, multiple, header} = this.props;
        let counter = -1;
        let even = true;
        const passProps = Object.assign({}, this.props, {modal: true});
        return(
            <div className={this.props.modal? 'modalInputs-root': 'inputs-root'}>
                <div className={'inputs-container'} onClick={!modal ? this.handleClick.bind(this,true) : false} >
                    <div className={ modal ? "inputList" : "inputList disable"}>
                        <table cellSpacing="0" className="table-list">
                            <thead>
                                <tr className="head-row">
                                    {header.map(function(item){
                                        counter++;
                                        return(
                                            <th className={"header-cell " + (counter === 0 ? "caption" : false)}>
                                                {item}
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(list).map(function (item) {
                                    even = !even;
                                    let model = list[item];
                                    if(multiple){
                                        let values = [];
                                        let units = [];
                                        let itemId = [];
                                        let name = item;
                                        Object.keys(model).map(function (item) {
                                            values.push(model[item].value);
                                            units.push(model[item].unit);
                                            itemId.push(item);
                                        });
                                        return (
                                            <Input inputKey={item} firstId={itemId[0]} secondId={itemId[1]} key={item} type={type} modal={modal} even={even} changeValue={this.changeValue.bind(this)} enable={model.enable}
                                                       name={name} value={values[0]} value1={values[1]} unit={units[0]} unit1={units[1]}/>
                                        )
                                    }
                                    return(
                                        <Input inputKey={item} key={item} type={type} modal={modal} even={even} changeValue={this.changeValue.bind(this)}
                                                   name={item} value={model.value} unit={model.unit} enable={model.enable}/>
                                    )
                                },this)}
                            </tbody>
                        </table>
                    </div>
                </div>
                {this.state.clicked ?
                    <ModalWin save={this.saveValues.bind(this)} update={this.handleClick.bind(this)}>
                        <InputList {...passProps} />
                    </ModalWin>
                    : false
                }
            </div>
        )
    }

    cloneObject(obj) {
        let copy = {};
        if (null == obj || "object" != typeof obj) return obj;
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.cloneObject(obj[attr]);
        }
        return copy;
    }

    handleClick(){
        this.setState({
            clicked: !this.state.clicked
        })
    }

    changeValue(name, value, enable, itemId) {
        let oldStates = this.cloneObject(this.props.list);
        let model = oldStates[name];
        model.enable = enable;
        if(value){
            if (this.props.multiple)
                model[itemId].value = value;
            else
                model.value = value;
        }
        this.props.changeValue(oldStates);
    }

    saveValues(list){
        this.setState({
            clicked: !this.state.clicked,
        });
        if (list)
            this.props.save(list,this.props.name);
    }
}

export default InputList;