/**
 * Created by urunzl on 24.11.2016.
 */
//components
import React,{Component} from 'react';
import tabsStore from '../../stores/tabsStore';
import tabsActions from '../../actions/tabsActions';
import {Link} from 'react-router';
import { browserHistory } from 'react-router'

//styles and images
import './Toolbar.css'

class Toolbar extends Component{
    constructor(props){
        super(props);
        this.state={
            openTabs : tabsStore.getOpenTabs(),
            activeTab: tabsStore.getActiveTab(),
        };
        this.update = this.update.bind(this);
    }

    componentWillMount(){
        tabsStore.addChangeListener(this.update);
    }

    componentWillUnmount(){
        tabsStore.removeChangeListener(this.update);
    }

    shouldComponentUpdate(nextProps, nextState){
        //pokud se renderuje nova stranka a otevreny tab zustava(pri meneni obsahu aktualniho tabu) musim zmenit obsah tabu
        if((nextProps.actualPage !== this.props.actualPage) && (nextState.activeTab === this.state.activeTab)) {
            const item = nextProps.actualPage;
            tabsActions.changeTab(item);
        }
        return true;
    }

    update(){
        this.setState({
            openTabs : tabsStore.getOpenTabs(),
            activeTab : tabsStore.getActiveTab()
        });
    }

    render(){
        let counter = -1;
        const actualPage = this.props.actualPage;
        return(
            <div id="toolbar">
                {this.state.openTabs.map(function(item){
                    counter++;
                    let active = counter === this.state.activeTab;
                    return(
                        <div onClick={this.handleChangeActiveTab.bind(this,counter)} key={counter} className={"toolbarItem " + (active ? "true" : false)}> 
                            <div className="toolbarText">
                                <Link key={item.name} to={active? actualPage.hash : item.hash} className="toolbarLink">
                                    {active ? actualPage.value + " " + actualPage.names[this.props.lang] : item.value + " " +item.names[this.props.lang]}
                                </Link>
                                <div className="closeTab" onClick={this.handleCloseTab.bind(this,counter)}>x</div>
                            </div>
                        </div>
                    );
                },this)}
                <div id="toolbarAdd" onClick={this.handleAddNewTab.bind(this)}>
                    <svg width={30} height={30} >
                        <circle cx="15" cy="15" r="14" stroke="#aebdc2" strokeWidth="1" fill="#bdc9ce" />
                        <text x="15" y="18" fontFamily="Verdana" fontSize="12" textAnchor="middle">x</text>
                    </svg>
                </div>
            </div>
        )
    }

    handleChangeActiveTab(index,e){
        tabsActions.changeActiveTab(index);
    }

    handleAddNewTab(){
        const item = this.props.actualPage;
        tabsActions.addTab(item);
    }

    handleCloseTab(index,e){
        console.log('handleCloseTAb');
        e.stopPropagation();
        //pokud zaviram otevreny tab a neni posledni, pak musim automaticky rerenderovat stranku na nasledujici tab
        if((index === this.state.activeTab) && (index !== this.state.openTabs.length-1)) {
            browserHistory.push(this.state.openTabs[index+1].hash);
        }
        //pokud je zavirajici tab poslednim tabem, pak se presmeruji na predchozi tab
        else if(index === this.state.openTabs.length-1) {
            browserHistory.push(this.state.openTabs[index !== 0 ? this.state.openTabs.length - 2 : 0].hash);
        }
        tabsActions.closeTab(index);
    }
}

export default Toolbar;