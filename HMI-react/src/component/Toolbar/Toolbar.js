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
            activeTab: tabsStore.getActiveTab()
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
        //pokud se renderuje nova stranka a otevreny tab zustava(pri meneni obsahu aktualniho tabu) mussim zmenit obsah tabu
        if((nextProps.actualPage !== this.props.actualPage) && (nextState.activeTab === this.state.activeTab)) {
            const item = nextProps.actualPage;
            tabsActions.changeTab([item.value + " " + item.page,item.hash]);
        }
        return true;
    }

    update(){
        this.setState({
            openTabs : tabsStore.getOpenTabs(),
            activeTab: tabsStore.getActiveTab()
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
                        <div className="toolbarArrowLeft"></div>
                        <div className="toolbarText">
                            <Link key={item[0]} to={active? actualPage.hash : item[1]} className="toolbarLink">
                                {active? actualPage.value + " " + actualPage.page : item[0]}
                            </Link>
                            <div className="closeTab" onClick={this.handleCloseTab.bind(this,counter)}>x</div>
                        </div>
                        <div className="toolbarArrowRight"></div>
                    </div>
                );
            },this)}
            <div id="toolbarAdd" onClick={this.handleAddNewTab.bind(this)}>
                <div className="addToolButton">+</div>
            </div>
        </div>
        )
    }

    handleChangeActiveTab(index,e){
        tabsActions.changeActiveTab(index);
    }

    handleAddNewTab(){
        const item = this.props.actualPage;
        tabsActions.addTab([item.value + " " + item.page,item.hash]);
    }

    handleCloseTab(index,e){
        e.stopPropagation();
        //pokud zaviram otevreny tab a neni posledni, pak musim automaticky rerenderovat stranku na nasledujici tab
        if((index === this.state.activeTab) && (index !== this.state.openTabs.length-1)) {
            browserHistory.push(this.state.openTabs[index+1][1]);
        }
        //pokud je zavirajici tab poslednim tabem, pak se presmeruji na predchozi tab
        else if(index === this.state.openTabs.length-1) {
            browserHistory.push(this.state.openTabs[index !== 0 ? this.state.openTabs.length - 2 : 0][1]);
        }
        tabsActions.closeTab(index);
    }
}

export default Toolbar;