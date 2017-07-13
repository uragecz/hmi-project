/**
 * Created by urunzl on 21.7.2016.
 */
import Dispatcher from '../dispatcher/Dispatcher';
import languageConstants from '../constants/languageConstants';

const content = require('../data/content.json');

var languageActions = {
  switchLanguage: function(language) {
    let data = content.filter(obj => obj.lang === language)[0];
    Dispatcher.handleAction({
      actionType: languageConstants.SWITCH_LANGUAGE,
      data: data
    });
  },
};

export default languageActions;
