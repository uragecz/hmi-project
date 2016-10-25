/**
 * Created by urunzl on 20.10.2016.
 */
import React from 'react';
import Page from '../../../component/Page/Page'
import InputList from '../../../component/InputList/InputList';
import productSettingsStore from '../../../stores/productSettingsStore';
import actionSettings from '../../../actions/settingsActions';
import './productSettings.css';

class ProductSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            productSpeed: productSettingsStore.getTotalSpeed(),
            productPackage: productSettingsStore.getPackage(),
            productAIR: productSettingsStore.getAIR(),
            productROTOR: productSettingsStore.getROTOR()
        };
        this.update = this.update.bind(this);
    }
    render(){
        console.log('parent');
        var {...other} = this.props;

        return(
            <Page>
                <div className="item size-3">
                    <InputList modal={false} checkBox={false} save={this.saveList.bind(this)} list={this.state.productSpeed} descTitle={"Speed"}/>
                    <InputList modal={false} checkBox={false} save={this.saveList.bind(this)} list={this.state.productAIR} descTitle={"Air"}/>
                </div>
                <div className="item size-3">
                    <div id="rotor-image"></div>
                </div>
                <div className="item size-3">
                    <InputList modal={false} checkBox={false} save={this.saveList.bind(this)} list={this.state.productPackage} descTitle={'Package'}/>
                    <InputList modal={false} checkBox={false} save={this.saveList.bind(this)} list={this.state.productROTOR} descTitle={"Rotor"}/>
                </div>
            </Page>
        )
    }


    componentWillUnmount(){
        productSettingsStore.removeChangeListener(this.update);
    }

    componentWillMount(){
        productSettingsStore.addChangeListener(this.update);
    }

    toggleChange(){

    }

    update(){
        this.setState({
            productSpeed: productSettingsStore.getTotalSpeed(),
            productPackage: productSettingsStore.getPackage(),
            productROTOR: productSettingsStore.getROTOR(),
            productAIR: productSettingsStore.getAIR()
        })
    }

    saveList(list,type){
        if(type === 'Speed')
            actionSettings.setProductSpeed(list);
        else if(type === "Package")
            actionSettings.setProductPackage(list);
        else if(type === "Air")
            actionSettings.setAir(list);
        else if(type === "Rotor")
            actionSettings.setRotor(list);
    }
}

export default ProductSettings;

