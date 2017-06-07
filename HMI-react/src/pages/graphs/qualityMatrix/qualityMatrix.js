/**
 * Created by urunzl on 8.2.2017.
 */
//components
import React, { Component } from 'react';
import Print from '../../../component/Graph';
import Page from '../../../component/Page/Page';
import QmSettingsStore from '../../../stores/qmSettingsStore';
import LoadingModal from '../../../component/ModalWindow/LoadingModal';

//styles and images
import './qualityMatrix.css';

let settingStyle = {};

class QualityMatrix extends Component{
    constructor(props){
        super(props);
        this.state = {
            done: false,
            channels: QmSettingsStore.getChannels(),
            openOption: !this.props.mobile,
            firstClick: true
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({done: true});
        }, 200);  //delay this to allow React to actually render the initial state.    

    }

    render(){
        const pageHeight = document.getElementById("content");
        if (pageHeight){
            let height = pageHeight.clientHeight-40 + 'px';
            settingStyle = {
                height: height
            }
        }

        return(
            <Page>
                <div className="item column-4">
                    <div className="element column-1">
                        <div className="optionCaption" onClick={this.props.mobile ?this.openOption.bind(this) : false}>
                            <div className="captionText">
                            VIEW SETTINGS
                            </div>
                            <div className="hamburger">
                                <svg width={30} height={30} strokeWidth={3} stroke='black'>
                                    <path d="M0,8 L30,8"/>
                                    <path d="M0,15 L30,15"/>
                                    <path d="M0,22 L30,22"/>
                                </svg>
                            </div>
                        </div>
                        {this.state.done ?
                            <div className={"optionSwitch " + (this.state.openOption ? "rollDown" : this.state.firstClick ? "showOf" : "rollUp")} id="bla" style={!this.props.mobile ? settingStyle : null}>
                                <div className="optionSwitch-item radioButtons">
                                    <div className="item-caption">Values :</div>
                                    <div className="customRadioButton">
                                        <input className='radioInput' type="radio" id="absolute" ref="radio" value="ABSOLUTE" name="values"/>
                                        <label className="radioInput-label" htmlFor="absolute">Absolute</label>
                                        <input className='radioInput' type="radio"  id="relative" ref="radio" value="RELATIVE" name="values"/>
                                        <label className="radioInput-label" htmlFor="relative">Relative</label>
                                    </div>
                                </div>
                                <div className="optionSwitch-item switch">
                                    <div className="customCheckbox">
                                        <input className='boxInput' onChange={this.toggleChange.bind(this)} type="checkbox" id="totalValues" ref="box"/>
                                        <label htmlFor="totalValues"/>
                                    </div>
                                    <span><label htmlFor="totalValues">Total values</label></span>
                                </div>
                                <div className="optionSwitch-item switch">
                                    <div className="customCheckbox">
                                        <input className='boxInput' onChange={this.toggleChange.bind(this)} type="checkbox"  id="labels" ref="box"/>
                                        <label htmlFor="labels"/>
                                    </div>
                                    <span><label htmlFor="labels">Labels</label></span>
                                </div>
                                <div className="optionSwitch-item switch">
                                    <div className="customCheckbox">
                                        <input className='boxInput' onChange={this.toggleChange.bind(this)} type="checkbox" id="sum" ref="box"/>
                                        <label htmlFor="sum"/>
                                    </div>
                                    <span><label htmlFor="sum">Sum</label></span>
                                </div>
                            </div>
                            : false}
                    </div>
                    <div className={"element column-3 " + (this.state.openOption && this.props.mobile ? "rollDown" : !this.state.openOption && this.props.mobile ? "rollUp" : false)} id="qmGraph">
                    <div id="forScale">
                        {!this.state.done ? <LoadingModal/> : false}
                        {this.state.done ? <Print scale="forScale" top='50%' mobile={this.props.mobile} channels={this.state.channels} /> : false}
                    </div>
                    </div>
                </div>
            </Page>
        )
    }

    openOption(){
        this.setState({
            openOption: !this.state.openOption,
            firstClick: false
        })
    }

    toggleChange(){

    }
}

export default QualityMatrix;