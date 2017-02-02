/**
 * Created by urunzl on 20.1.2017.
 */
import Dispatcher from '../dispatcher/Dispatcher';
import messageConstants from '../constants/messageConstants';
import http from 'superagent';
const okMessage = 'DATA WERE SENT SUCCESSFULLY ';
const errMessage = 'ERROR DURING DATA SENDING';

var serverActions = {
    sendData: function () {
        return new Promise(function (resolve, reject) {
            http.post("http://localhost:59297/api/qm/postqm")
                .set('Content-Type', 'application/json')
                .send('lol')
                .end(function (err, res) {
                    if (err == null && res.ok) {
                        Dispatcher.handleAction({
                            actionType: messageConstants.SHOW_MESSAGE,
                            data: okMessage,
                            error: false
                        });
                        resolve(true);
                    }
                    else {
                        Dispatcher.handleAction({
                            actionType: messageConstants.SHOW_MESSAGE,
                            data: err == null && res.ok ? okMessage : errMessage,
                            error: true
                        });
                        reject(false);
                    }
                })
        })
    },

    getData: function (url) {
        return new Promise(function (resolve, reject) {
            http.get(url)
                .end(function (err, res) {
                    if (err == null && res.ok) {
                        console.log('ok');
                        resolve(true);
                    }
                    else {
                        console.log('bad',err);
                        Dispatcher.handleAction({
                            actionType: messageConstants.SHOW_MESSAGE,
                            data: errMessage,
                            error: true
                        });
                        reject(false);
                    }
                })
        });
    }

};

export default serverActions;