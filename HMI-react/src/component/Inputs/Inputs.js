/**
 * Created by urunzl on 25.7.2016.
 */
import React from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import './Inputs.css'
import Input from './Input';

class Inputs extends React.Component {
  constructor(props){
    super(props);
    this.state={
      clicked: false,
      valueList: {},
      disableList: {
        na: true, s1a: true, s2a: true, s3a: true, s4a: true, l1a: true, l2a: true, l3a: true, t1a: true, t2a: true, t3a: true,
        nb: true, s1b: true, s2b: true, s3b: true, s4b: true, l1b: true, l2b: true, l3b: true, t1b: true, t2b: true, t3b: true
      },
      width: {}
    };
  };

  componentDidMount(){
    this.setState({
      width: this.refs.inputWidth.offsetWidth
    })
  }

  componentWillMount(){
    this.setState({
      valueList: this.props.list,
      disableList: this.props.disableList? this.props.disableList : this.state.disableList
    });
  }

  shouldComponentUpdate(nextProps,nextState){
    return this.state.valueList !== nextState.valueList || this.state.clicked !== nextState.clicked || this.state.disableList !== nextState.disableListe;
  }

  render(){
    return(
      <div ref="inputWidth" className={this.props.modal? 'modalInputs-root':'inputs-root'}>
        <div className={'inputs-container'} onClick={!this.props.modal? this.didClick.bind(this,true):false} >
          <div className="inputs-description">
            {this.props.descTitle}
          </div>
          {Object.keys(this.state.valueList).map(function (item) {
            return(
                <Input ref={item} update={this.takeValuesToModal.bind(this)} key={item.toString()} disable={this.state.disableList[item]} inputValue={this.state.valueList[item].toString()}
                       modal={this.props.modal} className={'input'} caption={item.toString()} unit={this.props.unit}/>
            )
          },this)}
        </div>
        {this.state.clicked ? <ModalWindow type="inputs" width={this.state.width} list={this.state.valueList} unit={this.props.unit} descTitle={this.props.descTitle}
                                           disableList={this.state.disableList} save={this.getValuesFromModal.bind(this)} update={this.didClick.bind(this)}/> : false }
      </div>
    )
  }

  getValuesFromModal(list,disableList){
    this.setState({
      clicked: false,
      valueList: list,
      disableList: disableList
    });

    let oldStates = Object.assign({},list);
    for (let i of Object.keys(list)){
      oldStates[i] = !disableList[i] ? 0 : oldStates[i];
    }
    this.props.columnsUpdate(oldStates);
  }

  takeValuesToModal(value,id,dis){
    this.props.modalUpdate(value,id,dis);
  }

  didClick(value){
    this.setState({
      clicked: value
    });
  }
}
Inputs.propTypes = {
  list: React.PropTypes.object,
  modal: React.PropTypes.bool.isRequired,
  modalUpdate: React.PropTypes.func,
  descTitle: React.PropTypes.string,
  unit: React.PropTypes.string,
};

export default Inputs;
