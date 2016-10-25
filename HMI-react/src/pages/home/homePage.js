/**
 * Created by urunzl on 1.8.2016.
 */
import React from 'react';
import Page from '../../component/Page/Page'


class HomePage extends React.Component {


    render(){
        var {...other} = this.props;
        return(
            <Page>
                <div className="layout horizontal-big start">
                    <div className="layout vertical third-column">
                        <div className="layout vertical start">
                            <h1>haha</h1>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}

export default HomePage;
