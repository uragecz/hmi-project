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
                    <InputList modal={false} name="PS" header={[text.speed,"",""]} type={["name1","input1","unit1"]} hideDesc={true} checkBox={false} save={this.saveList.bind(this)} list={this.state.productSpeed}/>
                    <InputList modal={false} name="PA" header={[text.air,"",""]} type={["name1","input1","unit1"]} hideDesc={true} checkBox={false} save={this.saveList.bind(this)} list={this.state.productAIR}/>
                </div>
                <div className="item size-3">
                    <div id="rotor-image"></div>
                </div>
                <div className="item size-3">
                    <InputList modal={false} name="PP" header={[text.package,"",""]} type={["name1","input1","unit1"]} hideDesc={true} checkBox={false} save={this.saveList.bind(this)} list={this.state.productPackage}/>
                    <InputList modal={false} name="PR" header={[text.rotor,"",""]} type={["name1","input1","unit1"]} hideDesc={true} checkBox={false} save={this.saveList.bind(this)} list={this.state.productROTOR}/>
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

