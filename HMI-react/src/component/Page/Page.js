/**
 * Created by urunzl on 1.8.2016.
 */
import React from 'react';
import './Page.css';

class Page extends React.Component {
    render(){
        var {children, ...others} = this.props;
        return(
            <div id="page" {...others}>
                {children}
            </div>
        )
    }
}

export default Page;