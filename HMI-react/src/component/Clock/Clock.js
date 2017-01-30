/**
 * Created by urunzl on 30.1.2017.
 */
import React, { Component } from 'react';

class Clock extends Component{
    constructor(props){
        super(props);
        this.state = {
            timeHM: null,
            timeYM: null
        }
    }

    render(){
        return(
            <div id="time">
                {this.props.time ? <div className="time HM"> {this.state.timeHM}</div> : false}
                {this.props.date ? <div className="time YM"> {this.state.timeYM}</div> : false}
            </div>
        )
    }

    componentDidMount() {
        this.tick();
        this.interval = setInterval(() => this.tick(), 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        const currentDate = new Date();
        let dd = currentDate.getDate();
        let mm = currentDate.getMonth()+1;
        let yy = currentDate.getFullYear();
        let min = currentDate.getMinutes();
        if(min < 10)
            min = '0' + min;
        if(dd < 10)
            dd= '0' + dd;
        if(mm < 10)
            mm= '0' + mm;
        this.setState((prevState) => ({
            timeHM: currentDate.getHours() + ":" +min,
            timeYM: dd+ "." + mm + "." + yy
        }));
    }
}

export default Clock;