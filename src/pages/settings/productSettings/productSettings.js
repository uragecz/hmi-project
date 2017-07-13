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
                <div className="item column-4">
                    <div className="element size-3">
                        <InputList data={text.speed} modal={false} name="PS" header={[text.speed.label,"",""]} type={["name","input1","unit1"]} save={this.saveList.bind(this)} list={this.state.productSpeed}/>
                        <InputList data={text.air} modal={false} name="PA" header={[text.air.label,"",""]} type={["name","input1","unit1"]} save={this.saveList.bind(this)} list={this.state.productAIR}/>
                    </div>
                    <div className="element size-3">
                        <div id="rotor-image"></div>
                    </div>
                    <div className="element size-3">
                        <InputList data={text.package} modal={false} name="PP" header={[text.package.label,"",""]} type={["name","input1","unit1"]} save={this.saveList.bind(this)} list={this.state.productPackage}/>
                        <InputList data={text.rotor} modal={false} name="PR" header={[text.rotor.label,"",""]} type={["name","input1","unit1"]} save={this.saveList.bind(this)} list={this.state.productROTOR}/>
                    </div>
                </div>
                <div className="item column-4">
                    <div id="switch">
                        <div className="switchElement switch">
                            <div className="customCheckbox">
                                <input className='boxInput' onChange={this.toggleChange.bind(this)} type="checkbox" id="fsi" ref="box"/>
                                <label htmlFor="fsi"/>
                            </div>
                            <span><label htmlFor="fsi">FSI</label></span>
                        </div>
                        <div className="switchElement switch">
                            <div className="customCheckbox">
                                <input className='boxInput' onChange={this.toggleChange.bind(this)} type="checkbox" id="qsi" ref="box"/>
                                <label htmlFor="qsi"/>
                            </div>
                            <span><label htmlFor="qsi">QSI</label></span>
                        </div>
                        <div className="switchElement switch">
                            <div className="customCheckbox">
                                <input className='boxInput' onChange={this.toggleChange.bind(this)} type="checkbox" id="asi" ref="box"/>
                                <label htmlFor="asi"/>
                            </div>
                            <span><label htmlFor="asi">ASI</label></span>
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
        if(type === 'PS')
            actionSettings.setProductSpeed(list);
        else if(type === "PP")
            actionSettings.setProductPackage(list);
        else if(type === "PA")
            actionSettings.setAir(list);
        else if(type === "PR")
            actionSettings.setRotor(list);
    }
}

export default ProductSettings;

