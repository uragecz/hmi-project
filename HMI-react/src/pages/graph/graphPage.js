/**
 * Created by urunzl on 1.8.2016.
 */
import React from 'react';
import Print from '../../component/Graph/Graph';
import graphStore from '../../stores/graphStore';
import graphAction from '../../actions/graphActions';
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
            channels: graphStore.getChannels(),
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
                    <InputList modal={false} descTitle={text.channels} hideDesc={false} multiple={true} type={["name1","input1","unit1","input2","unit2"]} save={this.saveList} list={this.state.channels} />
                </div>
                <div className="item column-3" id="graphColumn">
                    {!this.state.done ? <div id="loading"><i className="fa fa-spinner fa-spin fa-5x fa-fw" aria-hidden="true"></i></div> : false}
                    {this.state.done ? <Print channels={this.state.channels} /> : false}
                </div>
            </Page>
        )
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
