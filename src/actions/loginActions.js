/**
 * Created by urunzl on 24.1.2017.
 */
import Dispatcher from '../dispatcher/Dispatcher';
import loginConstants from '../constants/loginConstants';
import loginStore from '../stores/loginStore';
import messageConstants from '../constants/messageConstants';


var loginActions = {
    login: function(password) {
        let user = null;
        const users = loginStore.getUsers();
        Object.keys(users).map(function(item){
            let model = users[item];
            if(model.password === password)
                user = model;
        });
        if (!user){
            Dispatcher.handleAction({
                actionType: messageConstants.SHOW_MESSAGE,
                data: "BAD PASSWORD",
                error: true
            });
        }else{
            Dispatcher.handleAction({
                actionType: loginConstants.LOGIN,
                data: user
            });
        }
    },
    logout: function(){
        Dispatcher.handleAction({
            actionType: loginConstants.LOGOUT
        })
    }
};

export default loginActions;