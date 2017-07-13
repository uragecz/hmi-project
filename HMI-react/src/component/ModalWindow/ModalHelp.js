/**
 * Created by urunzl on 8.9.2016.
 */
import React from 'react';
import Modal from 'react-modal';
import './ModalWindow.css'

var customStyles = {
    overlay : {
        zIndex:11,
        top:80
    },
        content : {
        top                   : 'calc(50% - 80px)',
        left                  : '50%',
        width                 : 'auto',
        height                : 'auto',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(-50%, -50%)'
    }
};

class ModalHelp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    };

    render() {
        const {update} = this.props;
        return (
            <div>
                <Modal
                    isOpen={true}
                    onRequestClose={update.bind(this,false)}
                    contentLabel="Modal"
                    style={customStyles}>
                    <div className="modal">
                        <div className="modal-content">
                            <div id="helpContent">
                                <div className="helpButton">
                                    <button className={'toolButton'}>Screen this page</button>
                                </div>
                                <div className="helpButton">
                                    <button className={'toolButton'}>Screen all pages</button>
                                </div>
                                <div className="helpButton">
                                    <button className={'toolButton'}>Kill the programm</button>
                                </div>
                                <div className="helpButton">
                                    <button className={'toolButton'}>Kill yourself</button>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-buttons">
                            <img className="close-modal" onClick={update.bind(this)} src="../../assets/cancel-button.png"/>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

    shouldComponentUpdate(nextProps,nextState){
        return false;
    }
}

export default ModalHelp;
