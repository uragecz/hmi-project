import React, { Component } from 'react';
import './App.css';
import Footer from '../Footer/Footer';
import languageStore from '../../stores/languageStore';
import loginStore from '../../stores/loginStore';
import Header from '../Header/Header';
import InfoPage from '../InfoPage/InfoPage';
import Help from '../Help/Help';
import Message from '../Message/Message';

global.Perf = require('react-addons-perf');

class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            data: languageStore.getData(),
            user: loginStore.getLoggedUser(),
            infoPage: false,
            helpPage: false,
            mobile: ((window.innerWidth > 0) ? window.innerWidth : screen.width) <= 720
        };
        this.changeLanguage = this.changeLanguage.bind(this);
        this.getLoggedUser = this.getLoggedUser.bind(this);
    };

    render() {
        const data = this.state.data;
        return (
            <div id="appContainer">
                <Message />
                <Header data={data.page} mobile={this.state.mobile} closeInfoPage={this.closeInfoPage.bind(this)} logged={this.state.user} lang={data.lang} pathName={this.props.location.pathname}/>
                <div id="content">
                    {React.cloneElement(this.props.children, { data: data.page.content, mobile: this.state.mobile})}
                </div>
                <Footer languageActiveIcon={data.languageIcon} lang={data.lang} closeHelpPage={this.closeHelpPage.bind(this)}/>
                {this.state.infoPage ? <InfoPage closeInfoPage={this.closeInfoPage.bind(this)}/> : false}
                {this.state.helpPage ? <Help closeHelpPage={this.closeHelpPage.bind(this)} languageActiveIcon={data.languageIcon} lang={data.lang} /> : false}
            </div>
        );
    }

    closeInfoPage(close){
        this.setState({
            infoPage : close
        })
    }

    closeHelpPage(close){
        this.setState({
            helpPage : close
        })
    }

    changeLanguage(){
        this.setState({
            data: languageStore.getData()
        })
    }

    getLoggedUser(){
        this.setState({
            user: loginStore.getLoggedUser()
        })
    }

    componentWillMount() {
        languageStore.addChangeListener(this.changeLanguage);
        loginStore.addChangeListener(this.getLoggedUser);
    }

    componentWillUnmount(){
        languageStore.removeChangeListener(this.changeLanguage);
        loginStore.removeChangeListener(this.getLoggedUser)
    }
}

export default App;
