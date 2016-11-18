/**
 * Created by urunzl on 27.7.2016.
 */
import React from 'react';
import './Numpad.css';
import Button from '../Button/Button';
import ReactDOM from 'react-dom';

class Numpad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      firstRecord: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.addValue = this.addValue.bind(this);
    this.delValue = this.delValue.bind(this);
  };

  componentDidMount(){
    const input = ReactDOM.findDOMNode(this.refs.Input);
    input.focus();
    input.select();
  }

  render() {
    return (
      <div className={'root'}>
        <div className={'modalContainer'}>
          <div id="limits">
            <div id="minLimit">

            </div>
            <div id="maxLimit">
              {this.props.min}.. {this.props.max}
            </div>
          </div>
          <input className={'numpadInput'} onChange={this.handleChange} value={this.state.value} ref="Input" type="text"/><br/>
          <Button className={'row1 column1'} update={this.addValue} value={'1'}/>
          <Button className={'row1 column2'} update={this.addValue} value={'2'}/>
          <Button className={'row1 column3'} update={this.addValue} value={'3'}/><br/>
          <Button className={'row2 column1'} update={this.addValue} value={'4'}/>
          <Button className={'row2 column2'} update={this.addValue} value={'5'}/>
          <Button className={'row2 column3'} update={this.addValue} value={'6'}/><br/>
          <Button className={'row3 column1'} update={this.addValue} value={'7'}/>
          <Button className={'row3 column2'} update={this.addValue} value={'8'}/>
          <Button className={'row3 column3'} update={this.addValue} value={'9'}/><br/>
          <Button className={'row4 column1'} update={this.addValue} value={'.'}/>
          <Button className={'row4 column2'} update={this.addValue} value={'0'}/>
          <Button className={'row4 column3'} update={this.delValue} value={'<'}/>
        </div>
      </div>
    )
  }

  addValue(value){
    let number = this.state.firstRecord ? value : this.state.value + value;
    this.setState({
      value: number,
      firstRecord: false
    });
    this.props.updateValues(number);
  }

  handleChange(event){
    this.setState({
      value: event.target.value,
    });
  }

  delValue(){
    let i = this.state.value;
    let changedValue = this.state.firstRecord ? "" : i.slice(0, -1);
    this.setState({value: changedValue});
    this.props.updateValues(changedValue);
  }
}

Numpad.PropTypes={
  value: React.PropTypes.string,
  updateValues: React.PropTypes.func
};

export default Numpad;
