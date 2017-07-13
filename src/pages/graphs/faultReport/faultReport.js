/**
 * Created by urunzl on 8.2.2017.
 */
//components
import React, { Component } from 'react';
import graphsStore from '../../../stores/faultReportStore';
import Page from '../../../component/Page/Page'
import InputList from '../../../component/InputList/InputList';

//styles and images
import './faultReport.css';

class FaultReport extends Component{
    constructor(props){
        super(props);
        this.state = {
            cuts: graphsStore.getCuts(),
            qualityValues: graphsStore.getQualityValues(),
            qAlarms: graphsStore.getQAlarms(),
            yAlarms: graphsStore.getYAlarms(),
            techAlarms: graphsStore.getTechAlarms()
        };
        this.update = this.update.bind(this);
    }

    render(){
        const { data } = this.props;
        const text = data.qmSettings;
        return(
           <Page>
               <div className="item column-4">
                   <div className="element column-2">
                       <InputList data={text.nslt} modal={false} name="CTS" header={["Cuts","Absolute","/1000 Rh","/1000 km"]} multiple={true} type={["name","number1","number2","number3"]} save={this.saveList} list={this.state.cuts} />
                       <InputList data={text.slcmo} modal={false} name="QV" header={["Quality values","","/1000 m",""]} multiple={true} type={["name","number1","number2","number3"]} save={this.saveList} list={this.state.qualityValues} />
                   </div>
                   <div className="element column-2">
                       <InputList data={text.nslt} modal={false} name="QA" header={["Q-Alarms","Absolute","/1000 Rh","/1000 km"]} multiple={true} type={["name","number1","number2","number3"]} list={this.state.qAlarms} />
                       <InputList data={text.slcmo} modal={false} name="YA" header={["Y-Alarms","","",""]} multiple={true} type={["name","number1","number2","number3"]} list={this.state.yAlarms} />
                       <InputList data={text.slcmo} modal={false} name="TA" header={["Tech. Alarms","","",""]} multiple={true} type={["name","number1","number2","number3"]} save={this.saveList} list={this.state.techAlarms} />
                   </div>
               </div>
           </Page>
        )
    }

    update(){
        this.setState({
            cuts: graphsStore.getCuts(),
            qualityValues: graphsStore.getQualityValues(),
            qAlarms: graphsStore.getQAlarms(),
            yAlarms: graphsStore.getYAlarms(),
            techAlarms: graphsStore.getTechAlarms()
        })
    }

    saveList(){

    }

    componentWillMount(){
        graphsStore.addChangeListener(this.update);
    }

    componentWillUnmount(){
        graphsStore.removeChangeListener(this.update);
    }
}

export default FaultReport;