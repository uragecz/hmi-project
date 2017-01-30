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
        const{modal, list, firstTitle, secondTitle, type, multiple} = this.props;
        let even = true;
        let firstScale = !secondTitle ? type.length : type.length /2;
        const passProps = Object.assign({}, this.props, {modal: true});
        return(
            <div className={this.props.modal? 'modalInputs-root': 'inputs-root'}>
                <div className={'inputs-container'} onClick={!modal ? this.handleClick.bind(this,true) : false} >
                    <div className={ modal ? "inputList" : "inputList disable"}>
                        <table cellSpacing="0" className="table-list">
                            <thead>
                                <tr className="head-row">
                                    <th colSpan={firstScale.toString().length > 1 ? firstScale - 0.5 : firstScale} className={"title first " + (secondTitle ? "two"  : "one")}>
                                        {firstTitle}
                                    </th>
                                    {secondTitle ?
                                        <th colSpan={firstScale.toString().length > 1 ? firstScale + 0.5 : firstScale} className={"title second " + (secondTitle ? "two" : "one")}>
                                            {secondTitle}
                                        </th>
                                    : false}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(list).map(function (item) {
                                    even = !even;
                                    let model = list[item];
                                    if(multiple){
                                        let names = [];
                                        let values = [];
                                        let units = [];
                                        Object.keys(model).map(function (item) {
                                            values.push(model[item].value);
                                            names.push(item);
                                            units.push(model[item].unit);
                                        });
                                        return (
                                            <Input inputKey={item} key={item} type={type} modal={modal} even={even} changeValue={this.changeValue.bind(this)} enable={model.enable}
                                                       name={names[0]} name1={names[1]} value={values[0]} value1={values[1]}  unit={units[0]} unit1={units[1]}/>

                                        )
                                    }
                                    return(
                                        <Input inputKey={item} key={item} type={type} modal={modal} even={even} changeValue={this.changeValue.bind(this)}
                                                   name={item} value={model.value} unit={model.unit}/>
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

    changeValue(name,value,enable,key) {
        let oldStates = this.cloneObject(this.props.list);
        if (this.props.multiple) {
            Object.keys(oldStates).map(function (item) {
                let model = oldStates[item];
                if (model[name])
                    model[name].value = value;
                })
        }
        else
            oldStates[name].value = value;
        if(enable !== undefined)
            oldStates[key].enable = enable;
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