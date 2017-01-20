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
        const { data } = this.props;
        const text = data.productSettings;
        return(
            <Page>
                <div className="item size-3">
                    <InputList modal={false} type={["name1","input1","unit1"]} hideDesc={true} checkBox={false} save={this.saveList.bind(this)} list={this.state.productSpeed} firstTitle={text.speed}/>
                    <InputList modal={false} type={["name1","input1","unit1"]} hideDesc={true} checkBox={false} save={this.saveList.bind(this)} list={this.state.productAIR} firstTitle={text.air}/>
                </div>
                <div className="item size-3">
                    <div id="rotor-image"></div>
                </div>
                <div className="item size-3">
                    <InputList modal={false} type={["name1","input1","unit1"]} hideDesc={true} checkBox={false} save={this.saveList.bind(this)} list={this.state.productPackage} firstTitle={text.package}/>
                    <InputList modal={false} type={["name1","input1","unit1"]} hideDesc={true} checkBox={false} save={this.saveList.bind(this)} list={this.state.productROTOR} firstTitle={text.rotor}/>
                </div>
                <div className="item column-4">
                    <div id="switch">
                        <div className="switchElement">
                            <label className='captionLabel'>FSI</label>
                            <input className='boxInput' onChange={this.toggleChange.bind(this)} type="checkbox"  ref="box"/>
                        </div>
                        <div className="switchElement">
                            <label className='captionLabel'>QSI</label>
                            <input className='boxInput' onChange={this.toggleChange.bind(this)} type="checkbox"  ref="box"/>
                        </div>
                        <div className="switchElement">
                            <label className='captionLabel'>ASI</label>
                            <input className='boxInput' onChange={this.toggleChange.bind(this)} type="checkbox"  ref="box"/>
                        </div>
                    </div>
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

