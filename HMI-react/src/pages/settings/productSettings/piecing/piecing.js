/**
 * Created by urunzl on 25.10.2016.
 */
import React,{Component} from 'react';
import Page from '../../../../component/Page/Page';
import InputList from '../../../../component/InputList/InputList';
import productSettingsStore from '../../../../stores/productSettingsStore';
import actionSettings from '../../../../actions/settingsActions';
import '../productSettings.css';

class Piecing extends Component{
    constructor(props){
        super(props);
        this.state = {
            amiSpin: productSettingsStore.getAMISpin(),
            silverFeedLength: productSettingsStore.getSVL()
        };
        this.update = this.update.bind(this);
        this.saveList = this.saveList.bind(this);
    }
    render(){
        return(
            <Page>
                <div className="item column-2">
                    <InputList modal={false} checkBox={false} save={this.saveList} list={this.state.amiSpin} descTitle="AMISpin - sequence"/>
                    <InputList modal={false} checkBox={false} save={this.saveList} list={this.state.silverFeedLength} descTitle="Silver feed length [mm]"/>
                </div>
                <div className="item size-2">

                </div>
            </Page>
        )
    }

    componentWillMount(){
        productSettingsStore.addChangeListener(this.update);
    }

    componentWillUnmount(){
        productSettingsStore.removeChangeListener(this.update);
    }

    update(){
        this.setState({
            amiSpin: productSettingsStore.getAMISpin(),
            silverFeedLength: productSettingsStore.getSVL()
        })
    }

    saveList(list,type){
        if(type === 'AMISpin - sequence')
            actionSettings.setAMISpin(list);
        else if(type === "Silver feed length [mm]")
            actionSettings.setSilverFeedLength(list);
    }

}

export default Piecing;