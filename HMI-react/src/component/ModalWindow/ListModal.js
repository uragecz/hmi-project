/**
 * Created by urunzl on 4.10.2016.
 */


import React from 'react';
import Modal from 'react-modal';
import List from '../List/List';
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
        left                  : '80%',
        width                 : 'auto',
        height                : 'auto',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(-50%, -50%)'
    }
};

class ListModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null
        };
    };

    render() {
        var { onUpdate, ...others} = this.props;
        return (
            <div>
                <Modal
                    isOpen={true}
                    onRequestClose={onUpdate.bind(this,false)}
                    style={customStyles}>
                    <div className="modal">
                        <div className="modal-content">
                            <List {...others}/>
                        </div>
                        <div className="bottom-buttons">
                            <img className="close-modal" onClick={onUpdate.bind(this,false)} src="../../assets/cancel-button.png"/>
                            <img className="save-modal" onClick={this.saveToInput.bind(this,this.state.item)} src="../../assets/ok-button.png"/>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

    shouldComponentUpdate(nextProps,nextState){
        return false;
    }

    getValueFromNumpad(value){
        this.setState({
            item: value
        })
    }

    saveToInput(){
        this.props.editValue(this.state.item);
    }
}

export default ListModal;

