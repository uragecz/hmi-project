/**
 * Created by urunzl on 6.9.2016.
 */
import React from 'react';
import Modal from 'react-modal';
import './ModalWindow.css'

import close from '../../../assets/cancel-button.png';
import open from '../../../assets/ok-button.png';

var customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        width                 : 'auto',
        height                : 'auto',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(-50%, -50%)',
    }
};

class ModalWin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.children.props.list
        }
    }
    render() {
        customStyles.content["width"] = this.props.width;
        const {update, children} = this.props;
        return (
            <div>
                <Modal
                    isOpen={true}
                    onRequestClose={update.bind(this)}
                    style={customStyles}>
                    <div className="modal">
                        <div className="modal-content">
                            {React.cloneElement(children, { changeValue: this.changeValue.bind(this),list: this.state.list})}
                        </div>
                        <div className="bottom-buttons">
                            <img className="close-modal" onClick={update.bind(this)} src={close}/>
                            <img className="save-modal" onClick={this.sendToParent.bind(this)} src={open}/>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

    //saves list to parent InputList
    sendToParent(){
        this.props.save(this.state.list);
    }

    //save new values to modal window
    changeValue(list){
        console.log('changeValue',list);
        this.setState({
            list: list
        });
    }
}

export default ModalWin;

