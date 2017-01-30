/**
 * Created by urunzl on 20.1.2017.
 */
//components
import React,{ Component } from 'react';
import serverStore from '../../stores/messageStore';

//styles and images
import './Message.css';
import ok from '../../../assets/ok-button.png';
import err from '../../../assets/cancel-button.png';

class Message extends Component{
    constructor(props){
        super(props);
        this.state = {
            show : serverStore.getIsMessageShow(),
            message : serverStore.getMessage(),
            error: serverStore.getIsError()
        };
        this.showMessage = this.showMessage.bind(this);
    }

    render() {
        if (this.state.show) {
            return (
                <div id="message-window">
                    <div className="message-icon">
                        <img src={this.state.error? err : ok} width={60} height={60}  />
                    </div>
                    <div className="message">
                        {this.state.message}
                    </div>
                </div>
            );
        }
        else {
            return (null);
        }
    }

    showMessage(){
        this.setState({
            show: serverStore.getIsMessageShow(),
            message: serverStore.getMessage(),
            error: serverStore.getIsError()
        });
    }

    componentWillMount() {
        serverStore.addChangeListener(this.showMessage);
    }

    componentWillUnmount(){
        serverStore.removeChangeListener(this.showMessage);
    }
}

export default Message;