/**
 * Created by urunzl on 4.10.2016.
 */


import React from 'react';
import Modal from 'react-modal';
import List from '../List/List';
import './ModalWindow.css'
import selectionActions from '../../actions/selectionActions';

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
        left                  : '50%',
        width                 : 'auto',
        minWidth            : "30%",
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
            index: this.props.item
        };
    };

    render() {
        var { onUpdate, ...others} = this.props;
        return (
            <div>
                <Modal
                    isOpen={true}
                    onRequestClose={this.closeModal.bind(this)}
                    contentLabel="Modal"
                    style={customStyles}>
                    <div className="modal">
                        <div className="modal-content">
                            <List {...others} updateIndex={this.updateIndex.bind(this)} />
                        </div>
                        <div className="bottom-buttons">
                            <img className="close-modal" onClick={onUpdate.bind(this,false)} src="../../assets/cancel-button.png"/>
                            <img className="save-modal" onClick={this.saveNewActive.bind(this,this.state.item)} src="../../assets/ok-button.png"/>
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

    updateIndex(num){
        this.setState({
            index: num
        })
    }

    saveNewActive(){
        if (this.props.type === "shift")
            selectionActions.switchShift(this.state.index);
        else
            selectionActions.switchGroup(this.state.index);
        this.props.onUpdate(false);
    }

    closeModal(e){
        this.props.onUpdate(false);
    }
}

export default ListModal;

