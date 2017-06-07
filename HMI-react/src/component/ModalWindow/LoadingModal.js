/**
 * Created by urunzl on 22.2.2017.
 */

import React from 'react';
import Modal from 'react-modal';
import './ModalWindow.css'

var customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        height                : 'auto',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(-50%, -50%)',
        background            : 'transparent',
        border                : 'none'
     }
};

class ModalWin extends React.Component {
    render() {
        return (
            <div>
                <Modal
                    isOpen={true}
                    style={customStyles}>
                    <div className="modal">
                        <div className="modal-content">
                            <div id="loading"><i className="fa fa-spinner fa-spin fa-5x fa-fw" aria-hidden="true"></i></div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default ModalWin;

