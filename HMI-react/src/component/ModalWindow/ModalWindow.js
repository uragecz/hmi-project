/**
 * Created by Lukáš on 6/13/2016.
 */

import React from 'react';
import Modal from 'react-modal';
import Inputs from '../Inputs/Inputs';
import './ModalWindow.css'

var customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    width                 : 'auto',
    height                : 'auto',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-50%, -50%)'
  }
};

class ModalWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list,
      disableList: this.props.disableList
    };
  };

  render() {
    customStyles.content["width"] = this.props.width;
    var { update, type, list, descTitle,...other} = this.props;
    return (
      <div>
        <Modal
          isOpen={true}
          onRequestClose={update.bind(this,false)}
          style={customStyles}>
          <div className="modal">
          <div className="modal-content">
            {(() => {
              switch(type){
                case 'inputs':
                  return <Inputs modal={true} descTitle={this.props.descTitle} modalUpdate={this.getValuesFromInputs.bind(this)} list={list} { ...other}/>;

                case 'rect':
                  return 'ID: ' + descTitle;

                default:
                  return false;
              }
            })()}
          </div>
            <div className="bottom-buttons">
              <img className="close-modal" onClick={update.bind(this,false)} src="../../assets/cancel-button.png"/>
              <img className="save-modal" onClick={this.saveToInputs.bind(this)} src="../../assets/ok-button.png"/>
            </div>
            </div>
        </Modal>
      </div>
    )
  }

  shouldComponentUpdate(nextProps,nextState){
    return false;
  }

  saveToInputs(){
    this.props.save(this.state.list,this.state.disableList)
  }

  saveToInput(){
    this.props.editValue(this.state.value)
  }

  getValuesFromInputs(value,id,dis) {
    let oldEnableStates = Object.assign({}, this.state.list);
    let oldDisStates = Object.assign({}, this.state.disableList);
    oldEnableStates[id] = value;
    oldDisStates[id] = dis;


    this.setState({
      list: oldEnableStates,
      disableList: oldDisStates
    });
  }
}
ModalWindow.propTypes = {
  update: React.PropTypes.func.isRequired,
  type: React.PropTypes.string.isRequired,
  descTitle: React.PropTypes.string,
  disableList: React.PropTypes.object,
  list: React.PropTypes.object,
  save: React.PropTypes.func,
  unit: React.PropTypes.string
};

export default ModalWindow;

