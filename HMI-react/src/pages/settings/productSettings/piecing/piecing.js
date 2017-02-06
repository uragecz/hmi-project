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
        const { data }= this.props;
        const text = data.piecing;
        return(
            <Page>
                <div className="item column-4">
                    <div className="item column-2">
                        <InputList modal={false} name="AS" header={[text.amispin,"",""]} hideDesc={true} multiple={false}
                                   type={["name1","input1","unit1"]} save={this.saveList} list={this.state.amiSpin} />
                    </div>
                    <div className="item column-2">
                        <div className="yellow-row"></div>
                        <div id="piecing-graph1"></div>
                    </div>
                </div>
                <div className="item column-4">
                    <div className="item column-2">
                        <InputList modal={false} name="SFL" header={[text.silverFeedLength,"","",text.silverFeedSpeed,"",""]} hideDesc={true} multiple={true}
                                   type={["name1","input1","unit1","input2","unit2","box"]} save={this.saveList} list={this.state.silverFeedLength} />
                    </div>
                    <div className="item column-2">
                        <div className="yellow-row"></div>
                        <div id="piecing-graph2"></div>
                    </div>
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
        console.log('saveList',list,type);
        if(type === 'AS')
            actionSettings.setAMISpin(list);
        else if(type === "SFL")
            actionSettings.setSilverFeedLength(list);
    }

}

export default Piecing;