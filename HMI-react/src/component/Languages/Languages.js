/**
 * Created by urunzl on 13.10.2016.
 */
import React,{Component} from 'react';
import './Languages.css';

class Languages extends Component{
    constructor(props){
        super(props);
        this.state = {
            actualLanguage: "EN",
            openMenu: false
        }
    }

    render(){
        return(
            <div>
                <button onClick={this.openLanguages.bind(this)} className={this.state.openMenu ? 'infoButton open' : 'infoButton'}>{this.state.actualLanguage}</button>
                {this.state.openMenu ?
                    <div id="languageMenu">
                        <div className="languageMenuItem">
                            <button onClick={this.changeLanguage.bind(this,'EN')} className={'languageButton'}>EN</button>
                        </div>
                        <div className="languageMenuItem">
                            <button onClick={this.changeLanguage.bind(this,'CZ')} className={'languageButton'}>CZ</button>
                        </div>
                    </div>
                :false}
            </div>
        )
    }

    openLanguages(){
        this.setState({
            openMenu: !this.state.openMenu
        })
    }

    changeLanguage(lang){
        this.setState({
            actualLanguage: lang,
            openMenu: !this.state.openMenu
        });
        this.props.switchLanguage(lang);

    }
}

export default Languages;