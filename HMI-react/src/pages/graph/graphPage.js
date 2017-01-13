/**
 * Created by urunzl on 1.8.2016.
 */
import React from 'react';
import Print from '../../component/Graph/Graph';
import graphStore from '../../stores/graphStore';
import graphAction from '../../actions/graphActions';
import loadingIcon from '../../../assets/loadingIcon.gif'
import Page from '../../component/Page/Page'
import './graphPage.css'
import InputList from '../../component/InputList/InputList';


class GraphPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            print: null,
            loading: true,
            channels: graphStore.getChannels()
        }
        this.update = this.update.bind(this);
    }

    componentDidMount(){
        this.setReady();
    }

    render(){
        const {data} = this.props;
        console.log('graphPage render',this.state.print);
        return(
            <Page>
                <div className="item column-1">
                    <InputList modal={false} descTitle='Channels' hideDesc={false} multiple={true} type={["name1","input1","unit1","input2","unit2"]} save={this.saveList} list={this.state.channels} />
                </div>
                <div className="item column-3" id="graphColumn">
                    {this.state.loading? <img src={loadingIcon}/> : false}
                    {this.state.print? <Print channels={this.state.channels} readyToRender={this.readyRender.bind(this)}/> : false}
                </div>
            </Page>
        )
    }

    readyRender(){
        this.setState({
            loading: false
        })
    }

    setReady(){
        setTimeout(function() {
            this.setState({print: new Print()})
        }.bind(this), 100);

    }

    componentWillMount(){
        graphStore.addChangeListener(this.update);
    }

    componentWillUnmount(){
        graphStore.removeChangeListener(this.update);
    }

    update(){

        this.setState({
            channels: graphStore.getChannels(),
        })
    }

    saveList(list){
        graphAction.setChannels(list);
    }
}

export default GraphPage;
