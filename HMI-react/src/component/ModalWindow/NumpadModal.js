/**
 * Created by urunzl on 6.9.2016.
 */

import React from 'react';
import Modal from 'react-modal';
import Numpad from '../Numpad/Numpad';
import './ModalWindow.css'

var customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'none'
    },
    content : {
        top                   : '50%',
        left                  : '85%',
        width                 : 'auto',
        height                : 'auto',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(-50%, -50%)'
    }
};

class NumpadModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
    };

    render() {
        customStyles.content["width"] = this.props.width;
        var { onUpdate,  ...others } = this.props;
        return (
            <div>
                <Modal
                    isOpen={true}
                    onRequestClose={onUpdate.bind(this,false)}
                    style={customStyles}>
                    <div className="modal">
                        <div className="modal-content">
                            <Numpad  {...others} updateValues={this.getValueFromNumpad.bind(this)}/>
                        </div>
                        <div className="bottom-buttons">
                            <img className="close-modal" onClick={this.closeModal.bind(this)} src="../../assets/cancel-button.png"/>
                            <img className="save-modal" onClick={this.saveToInput.bind(this)} src="../../assets/ok-button.png"/>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

    closeModal(){
        this.props.onUpdate(false);
    }

    shouldComponentUpdate(nextProps,nextState){
        return false;
    }

    getValueFromNumpad(value){
        this.setState({
            value: value
        })
    }

    saveToInput(){
        this.props.editValue(this.state.value);
    }
}

export default NumpadModal;

