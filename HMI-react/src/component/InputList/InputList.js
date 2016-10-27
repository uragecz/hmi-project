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
        const{modal, list, descTitle, type, multiple} = this.props;
        let even = false;
        return(
            <div className={this.props.modal? 'modalInputs-root': 'inputs-root'}>
                <div className={'inputs-container'} onClick={!modal ? this.handleClick.bind(this,true) : false} >
                    <div className="inputs-description">
                        {descTitle}
                    </div>
                    <div className={ modal ? "inputList" : "inputList disable"}>
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
                                    console.log(model[item])
                                });
                                return (
                                    <Input key={item} type={type} modal={modal} even={even} changeValue={this.changeValue.bind(this)} name={names[0]} name1={names[1]}
                                           value={values[0]} value1={values[1]} unit={units[0]} unit1={units[1]}/>
                                )
                            }
                            return(
                                <Input key={item} type={type} modal={modal} even={even} changeValue={this.changeValue.bind(this)} name={item} value={model.value} unit={model.unit}/>
                            )
                        },this)}
                    </div>
                </div>
                {this.state.clicked ?
                    <ModalWin save={this.saveValues.bind(this)} update={this.handleClick.bind(this)}>
                        <InputList multiple={multiple} modal={true} type={type} list={list} descTitle={descTitle} />
                    </ModalWin>
                    : false
                }
            </div>
        )
    }

    cloneObject(obj) {
        var copy = {};
        if (null == obj || "object" != typeof obj) return obj;
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.cloneObject(obj[attr]);
        }
        return copy;
    }

    handleClick(){
        this.setState({
            clicked: !this.state.clicked
        })
    }

    changeValue(name,value){
        let oldStates = this.cloneObject(this.props.list);
        if(this.props.multiple){
            Object.keys(oldStates).map(function(item){
                let model = oldStates[item];
                if(model[name])
                    model[name].value = value;

            })
        }
        else
            oldStates[name].value = value;

        this.props.changeValue(oldStates);
    }

    saveValues(list){
        this.setState({
            clicked: !this.state.clicked,
        });
        if (list)
            this.props.save(list,this.props.descTitle);
    }
}

export default InputList;