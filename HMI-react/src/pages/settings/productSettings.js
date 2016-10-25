/**
 * Created by urunzl on 20.10.2016.
 */
import React from 'react';
import Page from '../../component/Page/Page'
import InputList from '../../component/InputList/InputList';
import productSettingsStore from '../../stores/productSettingsStore';
import actionSettings from '../../actions/settingsActions';
import './productSettings.css';

class ProductSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            productSpeed: productSettingsStore.getTotalSpeed(),
            productPackage: productSettingsStore.getPackage(),
            productAMISpin: productSettingsStore.getAMISpin(),
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
                <div className="item column-3">
                    <div className="item column-1 count-3">
                        <InputList modal={false} checkBox={false} save={this.saveList.bind(this)} list={this.state.productSpeed} descTitle={"Speed"}/>
                    </div>
                    <div className="item column-1 count-3">
                        <div id="rotor-image">
                        </div>
                    </div>
                    <div className="item column-1 count-3">
                        <InputList modal={false} checkBox={false} save={this.saveList.bind(this)} list={this.state.productPackage} descTitle={'Package'}/>
                    </div>
                    <div className="item column-2">
                        <InputList modal={false} checkBox={false} save={this.saveList.bind(this)} list={this.state.productROTOR} descTitle={"Rotor"}/>
                    </div>
                    <div className="item column-2">
                        <InputList modal={false} checkBox={false} save={this.saveList.bind(this)} list={this.state.productAIR} descTitle={"Air"}/>
                    </div>
                </div>

                <div className="item column-1">
                    <InputList modal={false} checkBox={false} save={this.saveList.bind(this)} list={this.state.productAMISpin} descTitle={"AMISpin"}/>
                    <div className="bottom row-1">
                        <div className="boxInputLabel count-3">
                            <div className="boxLabel">
                                QSI
                            </div>
                            <div className="boxInput">
                                <input className={'boxInput'} checked={false} onChange={this.toggleChange.bind(this)} type="checkbox"  ref="box"/>
                            </div>
                        </div>
                        <div className="boxInputLabel count-3">
                            <div className="boxLabel">
                                FSI
                            </div>
                            <div className="boxInput">
                                <input className={'boxInput'} checked={false} onChange={this.toggleChange.bind(this)} type="checkbox"  ref="box"/>
                            </div>
                        </div>
                        <div className="boxInputLabel count-3">
                            <div className="boxLabel">
                                ASI
                            </div>
                            <div className="boxInput">
                                <input className={'boxInput'} checked={false} onChange={this.toggleChange.bind(this)} type="checkbox"  ref="box"/>
                            </div>
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
            productAMISpin: productSettingsStore.getAMISpin(),
            productROTOR: productSettingsStore.getROTOR(),
            productAIR: productSettingsStore.getAIR()
        })
    }

    saveList(list,type){
        if(type === 'Speed')
            actionSettings.setProductSpeed(list);
        else if(type === "Package")
            actionSettings.setProductPackage(list);
        else if(type === "AMISpin")
            actionSettings.setAMISpin(list);
        else if(type === "Air")
            actionSettings.setAir(list);
        else if(type === "Rotor")
            actionSettings.setRotor(list);
    }
}

export default ProductSettings;

