/**
 * Created by urunzl on 20.1.2017.
 */
import Dispatcher from '../dispatcher/Dispatcher';
import serverConstants from '../constants/serverConstants';
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
                            actionType: serverConstants.SHOW_MESSAGE,
                            data: okMessage,
                            error: false
                        });
                        resolve(true);
                    }
                    else {
                        Dispatcher.handleAction({
                            actionType: serverConstants.SHOW_MESSAGE,
                            data: err == null && res.ok ? okMessage : errMessage,
                            error: true
                        });
                        reject(false);
                    }
                })
        })
    },

    getData: function (index) {
        return new Promise(function (resolve, reject) {
            http.get("http://localhost:59297/api/qm")
                .accept("application/json")
                .end(function (err, res) {
                    if (err == null && res.ok) {
                        Dispatcher.handleAction({
                            actionType: serverConstants.SHOW_MESSAGE,
                            data: okMessage
                        });
                        resolve(true);
                    }
                    else {
                        Dispatcher.handleAction({
                            actionType: serverConstants.SHOW_MESSAGE,
                            data: errMessage
                        });
                        reject(false);
                    }
                })
        });
    }
};

export default serverActions;