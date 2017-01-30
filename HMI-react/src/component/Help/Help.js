/**
 * Created by urunzl on 2.12.2016.
 */
//components
import React,{Component} from 'react';
import tabStore from '../../stores/tabsStore';
import helpActions from '../../actions/helpActions';
import Language from '../Languages/Languages';

//styles, images
import './Help.css'
import printOne from '../../../assets/printOne.png';
import printAll from '../../../assets/printAll.png';
import information from '../../../assets/information.png';


class Help extends Component {
    constructor(props){
        super(props);
        this.state = {
            actualLanguage: "EN",
            openLanguages: false
        };
        this.pageClick = this.pageClick.bind(this);
    }
    render() {
        return (
            <div id="helpPage" className="opacityBoxMenu">
                <div className="helpItem" id="printOne" onClick={this.printOnePage.bind(this)}>
                    <img src={printOne} width={100} height={100}/>
                </div>
                <div className="helpItem" onClick={this.printAllPages.bind(this)}>
                    <img src={printAll} width={100} height={100}/>
                </div>
                <div className="helpItem" onClick={this.openManual.bind(this)}>
                    <img src={information} width={100} height={100}/>
                </div>
                <div className="helpItem" onClick={this.openLanguages.bind(this)}>
                    <img src={this.props.languageActiveIcon} width={100} height={100}/>
                </div>
                {this.state.openLanguages ? <Language openLanguages={this.openLanguages.bind(this)} {...this.props}/> : false }
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener('click', this.pageClick, false);
    }

    componentWillUnmount(){
        window.removeEventListener('click', this.pageClick, false);
    }

    openLanguages(){
        this.setState({
            openLanguages: !this.state.openLanguages
        })
    }

    openManual(){
        //let item = tabStore.getActiveTab();
        //let tabs = tabStore.getOpenTabs();
        window.open("../../../main.pdf#nameddest=Mé projekty a úlohy", '_blank', 'fullscreen=yes');return false;
    }

    pageClick(e) {
        if (e.target.id === 'helpPage')
            this.props.closeHelpPage();
    }

    printOnePage(){
        this.props.closeHelpPage();
        helpActions.printOnePage(this.props.lang);
    }

    printAllPages(){
        this.props.closeHelpPage();
        helpActions.printAllPages(this.props.lang);
    }
}

export default Help;