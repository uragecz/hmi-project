/**
 * Created by urunzl on 13.10.2016.
 */
//components
import React,{Component} from 'react';
import languageActions from '../../actions/languageActions';
//styles and images
import './Languages.css';
import cz from '../../../assets/cze.png';
import eng from '../../../assets/eng.png';

class Languages extends Component{
    constructor(props){
        super(props);
        this.pageClick = this.pageClick.bind(this);
    }

    render(){
        return(
            <div id="languagePage" className="opacityBoxMenu">
                <div id="languageMenu">
                    <div className="languageIcon">
                        <img src={cz} width={100} height={100} onClick={this.switchLanguage.bind(this,'cz')}/>
                    </div>
                    <div className="languageIcon">
                        <img src={eng} width={100} height={100} onClick={this.switchLanguage.bind(this,'eng')}/>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener('click', this.pageClick, false);
    }

    componentWillUnmount(){
        window.removeEventListener('click', this.pageClick, false);
    }

    pageClick(e) {
        if (e.target.id === 'languagePage')
            this.props.openLanguages();
    }

    switchLanguage(language){
        languageActions.switchLanguage(language);
        this.props.openLanguages();
    }
}

export default Languages;