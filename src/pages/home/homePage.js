/**
 * Created by urunzl on 1.8.2016.
 */
import React from 'react';
import Page from '../../component/Page/Page'
import Matrix from '../../component/Matrix/Matrix.js';


class HomePage extends React.Component {
    render(){
        return(
            <Page>
                <div className="layout horizontal-big start">
                    <div className="layout vertical third-column">
                        <div id="matrixScale" className="layout vertical start">
                            <Matrix scale="matrixScale"/>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}

export default HomePage;
