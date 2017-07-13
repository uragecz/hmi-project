import React, { Component } from 'react'
import qmSettingsStore from '../../stores/qmSettingsStore';
import Rect from './Rect.js';
class Grid extends Component {
    constructor (props) {
        super(props)
        this.state = {
            QM_dec: qmSettingsStore.getQmDec(),
            QM_rem: qmSettingsStore.getQmRem()
        }
    }
    
    render () {
        let arrayCells = [];
        let arrayCells2 = [];
        const letters1 = ['A','B','C','D','E'];
        const letters2 = ['I','J','K'];
        for (let i = 0; i < 8; i++){
            let num1 = 6;
            let num2 = 1;
            for (let j = 0; j < 11; j++){
                if((i < 5) && (j<6)){
                    arrayCells.push(<Rect key={letters1[i]+""+num1} x={i*70} y={j*50} width={70} height={50} id={letters1[i]+""+num1}
                                QM_dec={this.state.QM_dec[letters1[i]+""+num1]} QM_rem={parseInt(this.state.QM_rem[letters1[i]+""+num1],10)}/>);
                    num1--;
                }
                if((i>4) && (j>8)){
                    arrayCells2.push(<Rect key={letters2[i-5]+""+num2} x={i*70} y={j*50} width={70} height={50} id={letters2[i-5]+""+num2}
                                QM_dec={this.state.QM_dec[letters2[i-5]+""+num2]} QM_rem={parseInt(this.state.QM_rem[letters2[i-5]+""+num2],10)} bottom={true}/>);
                    num2++;
                }
            }
        }
        return (
            <g id="grid">
                {arrayCells}
                <Rect x={350} y={0} width={210} height={300} id={'F'}
                    QM_dec={this.state.QM_dec['F']} QM_rem={this.state.QM_rem['F']}/>

                <Rect x={560} y={0} width={70} height={400} id={"SL+"}
                    QM_dec={null} QM_rem={0}/>
                <Rect x={630} y={0} width={70} height={400} id={"C+"}
                    QM_dec={null} QM_rem={0}/>

                <Rect x={350} y={300} width={140} height={50} id={'G'}
                     QM_dec={this.state.QM_dec['G']} QM_rem={this.state.QM_rem['G']}/>
                <Rect x={490} y={300} width={70} height={50} id={'H'}
                    QM_dec={this.state.QM_dec['H']} QM_rem={this.state.QM_rem['H']}/>
                {arrayCells2}

                <Rect x={560} y={400} width={70} height={150} id={"SL-"}
                    QM_dec={null} QM_rem={0} bottom={true}/>
                <Rect x={630} y={400} width={70} height={150} id={"C-"}
                    QM_dec={null} QM_rem={0} bottom={true}/>
              </g>
        )
    }

    componentWillMount(){
        qmSettingsStore.addChangeListener(this.update);
    }

    update(){
        this.setState({
            QM_dec: qmSettingsStore.getQmDec(),
            QM_rem: qmSettingsStore.getQmRem()
        });
    }

    componentWillUnmount(){
        qmSettingsStore.removeChangeListener(this.update);
    }
}

export default Grid;