import React, { Component } from 'react';
import './App.css';
import Footer from '../Footer/Footer';
import languageActions from '../../actions/languageActions'
import languageStore from '../../stores/languageStore';
import routes from '../../route/routes';
import Menu from '../Menu/Menu';
import Message from '../Message/Message';


global.Perf = require('react-addons-perf');


class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            data: languageStore.getData(),
            children: this.props.children,
            pathname: this.props.location.pathname,
            goBack: false
        };
        this.changeLanguage= this.changeLanguage.bind(this);
    };

    render() {
        return (
            <div id="appContainer">
                <Header />

                <Menu goBack={this.goBack.bind(this)} saveToHistory={this.props.children !== null} data={this.state.data.page} routes={routes}
                            pathName={this.state.goBack ? this.state.pathname : this.props.location.pathname}/>
                <div id="content">
                    {React.cloneElement(this.state.children, { data: this.state.data.page})}
                </div>
                <Footer switchLanguage={this.switchLanguage} languageActiveIcon={this.state.data.icon} pathName={this.props.location.pathname}/>
                <Message/>
            </div>
        );
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.children !== null) {
            this.setState({
                children: nextProps.children,
                pathname: nextProps.location.pathname
            })
        }
        else
            history.pushState({}, null, this.state.pathname);
        this.setState({goBack: false})
    }

    changeLanguage(){
        this.setState({
            data: languageStore.getData()
        })
    }

    goBack(e){
        this.setState({
            goBack: true
        })
    }

    switchLanguage(language){
        languageActions.switchLanguage(language);
    }

    componentWillMount() {
        languageStore.addChangeListener(this.changeLanguage);
    }

    componentWillUnmount(){
        languageStore.removeChangeListener(this.changeLanguage);
    }
}

export default App;
