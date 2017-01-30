import React, { Component } from 'react';
import './App.css';
import Footer from '../Footer/Footer';
import languageStore from '../../stores/languageStore';
import loginStore from '../../stores/loginStore';
import Header from '../Header/Header';
import InfoPage from '../InfoPage/InfoPage';

//global.Perf = require('react-addons-perf');

class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            data: languageStore.getData(),
            user: loginStore.getLoggedUser(),
            infoPage: false
        };
        this.changeLanguage = this.changeLanguage.bind(this);
        this.getLoggedUser = this.getLoggedUser.bind(this);
    };

    render() {
        const data = this.state.data;
        return (
            <div id="appContainer">
                <Header data={data.page} closeInfoPage={this.closeInfoPage.bind(this)} logged={this.state.user} lang={data.lang} pathName={this.props.location.pathname}/>
                <div id="content">
                    {React.cloneElement(this.props.children, { data: data.page.content})}
                </div>
                <Footer languageActiveIcon={data.languageIcon} lang={data.lang} />
                {this.state.infoPage ? <InfoPage closeInfoPage={this.closeInfoPage.bind(this)}/> : false}
            </div>
        );
    }

    closeInfoPage(close){

        this.setState({
            infoPage : close ? close : !this.state.infoPage
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
