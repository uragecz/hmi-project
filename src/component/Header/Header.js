/**
 * Created by urunzl on 20.1.2017.
 */
//components
import React,{ Component } from 'react';
import routes from '../../route/routes';
import Options from '../Options/Options';
import MainMenu from '../Menu/MainMenu';
import TopMenu from '../Menu/TopMenu';
import historyActions from '../../actions/historyActions';
import helpStore from '../../stores/helpStore';
import NumpadModal from '../ModalWindow/NumpadModal';
import loginActions from '../../actions/loginActions';
import selectionStore from '../../stores/selectionStore';
//styles and images
import './Header.css';
import openMenu from '../../../assets/openMenu.png';
import login from '../../../assets/login.png';
import logout from '../../../assets/logout.png';

/* eslint-disable */

var path = null;

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            showMenu : false,
            showLogin: false,
            activeItem: selectionStore.getActiveItem(),
           
        };
        this.pageClick = this.pageClick.bind(this);
        this.update = this.update.bind(this);
    }

    render(){
        const { pathName, data, ...others } = this.props;
        const pathArray = pathName.split("/").filter(e => e.length);
        let obj = routes;
        let setting = null;
        let history = {};
        let visitedItems = [];
        if (pathArray.length !== 0 ){
            pathArray.map(function (item) {
                if (obj[item].name === item){
                    setting = obj[item].setting;
                    history = obj[item];
                    if ( Object.keys(obj[item].children).length !== 0){
                        obj = obj[item].children;
                        visitedItems.push(history);
                    }
                }
            })
        }
        !helpStore.getIsRendering() && path !== pathName ? historyActions.pushHistory(history): false;
        path = pathName;
        return(
            <div id="header">
                <div id="menuOpenButton" onClick={this.openMainMenu.bind(this)}>
                    <img src={openMenu} width={40} height={40} />
                </div>
                {this.state.showMenu ?
                    <MainMenu update={this.openMainMenu.bind(this)} routes={routes} data={data} pathName={pathName} />
                 : false}
                <div id="info">
                    <div id="article-shift">
                        <div id="infoName"><p className="scrollAnim">Perla a.s. CZ, Bavlna, 22Text, 5,5Tex</p></div>
                        <div id="shift-hamburger">
                            <svg width="12" height="12" stroke="#244c5a" stroke-width="2">
                                <path d="M0,2 L12,2"></path>
                                <path d="M0,6 L12,6"></path>
                                <path d="M0,10 L12,10"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <TopMenu actualPage={history} obj={obj} visitedItems={visitedItems} pathArray={pathArray} lang={this.props.lang}/>
                {pathArray.length !== 0 && history.setting ?
                    <Options data={data} options={setting} {...others} />
                : false }
                <div id="keyButton" onClick={this.props.logged ? this.logout.bind(this,false) : this.showLoginNumpad.bind(this)} >
                    <div id="loginIcon">
                        <img src={this.props.logged ? logout : login} width={60} height={42} />
                    </div>
                    <div id="loginPoints">
                        <svg height="10" width="25">
                            <circle cx="5" cy="5" r="5" strokeWidth="0" fill={this.props.logged ? this.props.logged.level > 0 ? "#42e242" : "white" : "white"} />
                            <circle cx="20" cy="5" r="5" strokeWidth="0" fill={this.props.logged ? this.props.logged.level >= 2 ? "#42e242" : "white" : "white"} />
                        </svg>
                    </div>
                </div>
                {this.state.showLogin ?
                    <NumpadModal value="" onUpdate={this.showLoginNumpad.bind(this)} editValue={this.setPassword.bind(this)} password={true}/>
                :false}

            </div>
        )
    }

    openMainMenu(){
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    showLoginNumpad(){
        this.setState({
            showLogin: !this.state.showLogin
        })
    }

    logout(item){
        this.props.closeInfoPage(item);
        loginActions.logout();

    }

    setPassword(value){
        this.setState({
            showLogin: !this.state.showLogin
        });
        loginActions.login(value);
    }

    componentDidMount() {
        this.myTimer = setTimeout(()=>{
            this.logout(true);
        },120000);
        window.addEventListener('click', this.pageClick, false);
    }

    update() {
        this.setState({
            activeItem: selectionStore.getActiveItem(),
           });
    }

    componentWillMount() {
        selectionStore.addChangeListener(this.update);
    }

    componentWillUnmount(){
        window.removeEventListener('click', this.pageClick, false);
        selectionStore.removeChangeListener(this.update);
    }

    pageClick(){
        clearTimeout(this.myTimer);
        this.myTimer = setTimeout(()=>{
            this.logout(true);
        },120000);
    }
}

export default Header;