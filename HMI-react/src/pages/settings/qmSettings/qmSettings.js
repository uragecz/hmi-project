/**
 * Created by urunzl on 1.8.2016.
 */
import React from 'react';
import Print from '../../../component/Graph/Graph';
import qmSettingsStore from '../../../stores/qmSettingsStore';
import qmSettingsAction from '../../../actions/qmSettingsAction';
import Page from '../../../component/Page/Page'
import './qmSettings.css'
import InputList from '../../../component/InputList/InputList';


class QmSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            print: null,
            loading: true,
            channels: qmSettingsStore.getChannels(),
            piecer: qmSettingsStore.getPiecer(),
            SLCMOSettings: qmSettingsStore.getSLCMOsettings(),
            qAlarms: qmSettingsStore.getQAlamrs(),
            yAlarms: qmSettingsStore.getYAlarms(),
            techAlarms: qmSettingsStore.getTechAlarms(),
            done: false
        };
        this.update = this.update.bind(this);
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({done: true});
        }, 200);  //delay this to allow React to actually render the initial state.
    }

    render(){
        const { data } = this.props;
        const text = data.graphPage;
        return(
            <Page>
                <div className="item column-1">
                    <InputList modal={false} name="CHAN" header={["N-S-L-T","%","mm",""]} firstTitle={text.channels} multiple={true} type={["name1","input1","input2","box"]} save={this.saveList} list={this.state.channels} />
                    <InputList modal={false} name="SL" header={["SL-C-MO","%","m",""]} multiple={true} type={["name1","input1","input2","box"]} save={this.saveList} list={this.state.SLCMOSettings} />
                </div>
                <div className="item column-3" id="graphColumn">
                    {!this.state.done ? <div id="loading"><i className="fa fa-spinner fa-spin fa-5x fa-fw" aria-hidden="true"></i></div> : false}
                    {this.state.done ? <Print channels={this.state.channels} /> : false}
                </div>
                <div className="item column-4" id="bottom-absolute-zero">
                    <div className="item column-1">

                        <InputList modal={false} name="PIER" header={["Piecer","%",""]} firstTitle={"Piecer"} multiple={false} type={["name1","input1","box"]} save={this.saveList} list={this.state.piecer} />
                    </div>
                    <div className="item column-1">
                        <InputList modal={false} name="QA" header={["Q-Alarms","%",""]} multiple={false} type={["name1","input1","box"]} save={this.saveList} list={this.state.qAlarms} />
                    </div>
                    <div className="item column-1">
                        <InputList modal={false} name="YA" header={["Y-Alarms","No.","km",""]} multiple={true} type={["name1","input1","input2","box"]} save={this.saveList} list={this.state.yAlarms} />
                    </div>
                    <div className="item column-1">
                        <InputList modal={false} name="TA" header={["Tech. Alarms","%",""]} multiple={false} type={["name1","input1","box"]} save={this.saveList} list={this.state.techAlarms} />
                    </div>
                </div>
            </Page>
        )
    }

    componentWillMount(){
        qmSettingsStore.addChangeListener(this.update);
    }

    componentWillUnmount(){
        qmSettingsStore.removeChangeListener(this.update);
    }

    update(){
        this.setState({
            channels: qmSettingsStore.getChannels(),
            piecer: qmSettingsStore.getPiecer(),
            SLCMOSettings: qmSettingsStore.getSLCMOsettings(),
            qAlarms: qmSettingsStore.getQAlamrs(),
            yAlarms: qmSettingsStore.getYAlarms(),
            techAlarms: qmSettingsStore.getTechAlarms()
        })
    }

    saveList(list,type){
        switch (type){
            case 'CHAN':
                qmSettingsAction.setChannels(list);
                break;
            case 'SL':
                qmSettingsAction.setSLCMO(list);
                break;
            case 'QA':
                qmSettingsAction.setQAlarms(list);
                break;
            case 'YA':
                qmSettingsAction.setYAlarms(list);
                break;
            case 'TA':
                qmSettingsAction.setTechAlarms(list);
                break;
            case 'PIER':
                qmSettingsAction.setPiecer(list);
                break;
        }
    }
}

export default QmSettings;
