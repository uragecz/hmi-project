/**
 * Created by urunzl on 1.8.2016.
 */
import React from 'react';
import Print from '../../component/Graph/Graph';
import Inputs from '../../component/Inputs/Inputs';
import graphStore from '../../stores/graphStore';
import loadingIcon from '../../../assets/loadingIcon.gif'
import Page from '../../component/Page/Page'
import './graphPage.css'


class GraphPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            print: null,
            loading: true
        }
    }

    componentDidMount(){
        this.setReady();
    }

    render(){
        const graphList = graphStore.getGraphValue();
        var {data} = this.props;
        return(
            <Page>
                <div className="inputs">
                    <Inputs modal={false} unit='%' list={graphList.rotation} descTitle={data.graph.machine}/>
                    <Inputs modal={false} unit='mm' list={graphList.machine} descTitle={data.graph.rotation}/>
                </div>
                <div className="graph">
                    {this.state.loading? <img src={loadingIcon}/> : false}
                    {this.state.print? <Print readyToRender={this.update.bind(this)}/> : false}
                </div>

            </Page>
        )
    }

    update(){
        this.setState({
            loading: false
        })
    }

    setReady(){
        setTimeout(function() {
            this.setState({print: new Print()})
        }.bind(this), 100);

    }
}

export default GraphPage;
