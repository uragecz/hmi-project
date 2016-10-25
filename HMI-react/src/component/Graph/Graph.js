/**
 * Created by Lukáš on 6/13/2016.
 */
import React from 'react';
import graphStore from '../../stores/graphStore';
import graphActions from '../../actions/graphActions'
import ModalWindow from '../ModalWindow/ModalWindow';
import './Graph.css';

/* eslint-disable */
class Rect extends React.Component {
  constructor(props){
    super(props);
    this.state={
      canvas: {},
      id: null,
      clicked: false
    };
    this.didClick = this.didClick.bind(this);
  }

  render() {
    if (this.state.clicked) {
      return (
          <div>
            <ModalWindow descTitle={this.state.id} type="rect" update={this.didClick} open={this.state.clicked}/>
          </div>
      );
    }
    else
      return (null);
  }

  didClick(){
    this.setState({
      clicked: false
    });
  }

  componentDidUpdate(){
    this.updateRect();
  }

  shouldComponentUpdate(nextProps,nextState){
    return (this.props.QM_Rem !== nextProps.QM_Rem) || (this.props.QM_Dec !== nextProps.QM_Dec) || ( this.state.clicked !== nextState.clicked);
  }

  componentDidMount(){
    if(this.props.select !== 0) {
      this.rect= new fabric.Rect({
        height: this.props.height,
        width: this.props.width,
        stroke: 'black',
        fill: '#ffffff',
        selectable: false
      });
      this.text1= new fabric.Text(this.props.QM_Rem.toString(), {
        fontSize: 15,
        fill: "red",
        left: (this.props.width / 2) - 8,
        top: (this.props.height / 2) - 19
      });
      this.text2= new fabric.Text(this.props.QM_Dec.toString(), {
        fontSize: 15,
        left: (this.props.width / 2) - 8,
        top: (this.props.height / 2) + 2
      });
      this.group= new fabric.Group([this.rect, this.text1, this.text2], {
        left: this.props.x + 50,
        top: this.props.y,
        lockMovementX: true,
        lockMovementY: true
      });

      this.group.on('mouseup', () => {
        this.setState({
          clicked: true
        })
      });

      this.state.canvas.add(this.group);

      this.state.canvas.forEachObject(function (o) {
        o.hasControls = false;
      });
    }
    else{
      this.rect= new fabric.Rect({
        height: this.props.height,
        width: this.props.width,
        stroke: 'black',
        fill: '#ffffff',
        left: this.props.x + 50,
        top: this.props.y,
        selectable: false
      });
      this.state.canvas.add(this.rect);
    }
  }

  componentWillMount(){
    this.setState({
      canvas: this.props.canvas,
      id: this.props.id
    })
  }

  updateRect(){
    if(this.text1 !== undefined && this.text2 !== undefined ) {
      this.text1.text= this.props.QM_Rem.toString();
      this.text2.text= this.props.QM_Dec.toString();
      this.state.canvas.renderAll();
    }
  }
}
Rect.propTypes = {
  canvas: React.PropTypes.object.isRequired,
  QM_Rem: React.PropTypes.number,
  QM_Dec: React.PropTypes.number,
  id: React.PropTypes.string,
  y: React.PropTypes.number,
  x: React.PropTypes.number
};

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: {}
    };
  }

  render() {
    return (<div></div>)
  }

  componentDidUpdate() {
    this.updateColumn();
  }

  updateColumn(){
    if(this.props.height <= 400) {
      this.column.set({
        height: this.props.height,
        width: this.props.width,
        left: this.props.x + 50,
        top: 0,
      });
    }
    else{
      this.column.set({
        height: 550-this.props.height,
        width: this.props.width,
        left: this.props.x + 50,
        top: this.props.height,
      });
    }
    this.state.canvas.renderAll();
  }

  componentWillMount(){
    this.setState({
      canvas: this.props.canvas
    })
  }

  componentWillUnmount(){
    this.state.canvas.remove(this.column);
  }

  componentDidMount(){
    if(this.props.height <= 400) {
      this.column = new fabric.Rect({
        height: this.props.height,
        width: this.props.width,
        left: this.props.x + 50,
        top: 0,
        evented: false,
        selectable: false,
        border: '#9679a7',
        fill: "rgb(206,220,0)",
      });
      this.state.canvas.add(this.column);
    }
    else{
      this.column = new fabric.Rect({
        height: 550-this.props.height,
        width: this.props.width,
        left: this.props.x + 50,
        top: this.props.height,
        evented: false,
        selectable: false,
        border: '#9679a7',
        fill: '#9679a7'
      });
      this.state.canvas.add(this.column);
    }
    this.state.canvas.moveTo(this.column,0 ); // set level of stack
  }

  shouldComponentUpdate(nextProps){
    return (this.props.x !== nextProps.x) || (this.props.width !== nextProps.width) || (this.props.height !== nextProps.height);
  }
}
Column.propTypes = {
  canvas: React.PropTypes.object.isRequired,
  x: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  color: React.PropTypes.string
};

class Columns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: props.canvas,
      states: graphStore.getGraphValue(),
    };
    this.onInputUpdated = this.onInputUpdated.bind(this);
  }

  render() {
    return(
      <div>
        {this.state.states.nb !==0 && this.state.states.na !== 0 ? <Column x={this.state.states.nb} color={'rgba(255,0,0,0.5)'} width={this.getWidth(0)}
                                              height={this.state.states.na} canvas={this.state.canvas}/>: false}
        {this.state.states.s1b !==0 && this.state.states.s1a !== 0 ? <Column x={this.state.states.s1b} color={'rgba(255,0,0,0.5)'} width={this.getWidth(1)}
                                              height={this.state.states.s1a} canvas={this.state.canvas}/>: false}
        {this.state.states.s2b !==0 && this.state.states.s2a !== 0 ?  <Column x={this.state.states.s2b} color={'rgba(255,0,0,0.5)'} width={this.getWidth(2)}
                                              height={this.state.states.s2a} canvas={this.state.canvas}/>: false}
        {this.state.states.s3b !==0 && this.state.states.s3a !== 0 ? <Column x={this.state.states.s3b} color={'rgba(255,0,0,0.5)'} width={this.getWidth(3)}
                                              height={this.state.states.s3a} canvas={this.state.canvas}/>: false}
        {this.state.states.s4b !==0 && this.state.states.s4a !== 0 ? <Column x={this.state.states.s4b} color={'rgba(255,0,0,0.5)'} width={this.getWidth(4)}
                                              height={this.state.states.s4a} canvas={this.state.canvas}/>: false}
        {this.state.states.l1b !==0 && this.state.states.l1a !== 0 ? <Column x={this.state.states.l1b} color={'rgba(255,0,0,0.5)'} width={this.getWidth(5)}
                                              height={this.state.states.l1a} canvas={this.state.canvas}/>: false}
        {this.state.states.l2b !==0 && this.state.states.l2a !== 0 ? <Column x={this.state.states.l2b} color={'rgba(255,0,0,0.5)'} width={this.getWidth(6)}
                                              height={this.state.states.l2a} canvas={this.state.canvas}/>: false}
        {this.state.states.l3b !==0 && this.state.states.l3a !== 0 ?  <Column x={this.state.states.l3b} color={'rgba(255,0,0,0.5)'} width={this.getWidth(7)}
                                              height={this.state.states.l3a} canvas={this.state.canvas}/>: false}
        {this.state.states.t1b !==0 && this.state.states.t1a !== 0 ? <Column x={this.state.states.t1b} color={'rgba(255,0,0,0.5)'} width={this.getWidth(8)}
                                              height={this.state.states.t1a} canvas={this.state.canvas}/>: false}
        {this.state.states.t2b !==0 && this.state.states.t2a !== 0 ?  <Column x={this.state.states.t2b} color={'rgba(255,0,0,0.5)'} width={this.getWidth(9)}
                                              height={this.state.states.t2a} canvas={this.state.canvas}/>: false}
        {this.state.states.t3b !==0 && this.state.states.t3a !== 0 ? <Column x={this.state.states.t3b} color={'rgba(255,0,0,0.5)'} width={this.getWidth(10)}
                                              height={this.state.states.t3a} canvas={this.state.canvas}/>: false}

      </div>
    )
  }

  shouldComponentUpdate(nextState){
    return (this.state.states !== nextState.states);
  }

  onInputUpdated(list){
    let oldStates = Object.assign({},this.state.states);
    for (let i of Object.keys(list)){
      let char = i.slice(-1);
      switch(char){
        case 'a':
          oldStates[i] = this.getY(list[i]);
          break;
        case 'b':
          oldStates[i] = this.getX(list[i]);
          break;
        default:
          break;
      }
    }
    graphActions.saveValueToMachine(oldStates);
    this.setState({
      states: oldStates
    });
  }

  getY(a) {
    if (a===0)
      return 0;
    var numbers = [300, 200, 120, 100, 80, 60, 40, 20, 0, -20, -30];
    var i = 0;
    var number = 0;
    for (;i < numbers.length; i++)
    {
      if(numbers[i] <= a){
        break;
      }
    }
    if(i>=1){
        number = ((a-numbers[i-1])/(numbers[i]-numbers[i-1]) *  (i*50 - (i-1)*50) + (i-1)*50);
    }
    return Math.round(number);
  }

  getX(a){
    var numbers=[2, 10, 20, 30, 50, 80, 160, 320, 5000];
    var i = 0;
    var number = 0;
    for(;i<numbers.length;i++){
      if (numbers[i] >= a)
        break;
    }
    if(i>=4)
        number = ((a-numbers[i-1])/(numbers[i]-numbers[i-1]) *(i*70 -(i-1)*70)+(i-1)*70);
    else
      number =(a/numbers[i])*(i*70);
    return Math.round(number);
  }

  getWidth(e){
    var states = [this.state.states.nb,this.state.states.s1b,this.state.states.s2b,this.state.states.s3b,this.state.states.s4b,this.state.states.l1b,this.state.states.l2b,this.state.states.l3b,
      this.state.states.t1b,this.state.states.t2b,this.state.states.t3b];
    var number = 0;
    var i = e +1;
    for(; i < states.length; i++){
      if (i < 8) {
        if (states[i] > 0) {
          number = states[i];
          break;
        }
      }else{
        if (states[i] > 0){
          number = states[i];
          break;
        }
      }

    }
    return number === 0 ? (840 - states[e]) : ((number-states[e]) + 0.15);
  }
}
Columns.propTypes = {
  canvas: React.PropTypes.object.isRequired,
};

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: {},
      QM_detected: graphStore.getQmDec(),
      QM_removed: graphStore.getQmRem()
    };
    this.update = this.update.bind(this);
  }

  shouldComponentUpdate(nextProps,nextState){
    return ((nextState.QM_removed !== this.state.QM_removed) || (nextState.QM_detected !== this.state.QM_detected))
  }

  render(){
    var arrayCells = [];
    var arrayCells2 = [];
    var letters1 = ['a','b','c','d','e'];
    var letters2 = ['i','j','k'];

    for (let i = 0; i < 8; i++){
      var num1 = 6;
      var num2 = 1;
      for (let j = 0; j < 11; j++){
        if((i < 5) && (j<6)){
          arrayCells.push(<Rect key={letters1[i]+""+num1} x={i*70} y={j*50} canvas={this.state.canvas} width={70} height={50} id={letters1[i]+""+num1}
                                QM_Dec={this.state.QM_detected[letters1[i]+""+num1]} QM_Rem={parseInt(this.state.QM_removed[letters1[i]+""+num1],10)}/>);
          num1--;
        }
        if((i>4) && (j>8)){
          arrayCells2.push(<Rect key={letters2[i-5]+""+num2} x={i*70} y={j*50} canvas={this.state.canvas} width={70} height={50} id={letters2[i-5]+""+num2}
                                 QM_Dec={this.state.QM_detected[letters2[i-5]+""+num2]} QM_Rem={parseInt(this.state.QM_removed[letters2[i-5]+""+num2],10)}/>);
          num2++;
        }
      }
    }

    return (
      <div>
        {arrayCells}
        <Rect canvas={this.state.canvas} x={350} y={0} width={210} height={300} id={'f'}
              QM_Dec={this.state.QM_detected['f']} QM_Rem={this.state.QM_removed['f']}/>
        <Rect canvas={this.state.canvas} x={560} y={0} width={140} height={400} id={null}
              QM_Dec={0} QM_Rem={0}/>
        <Rect canvas={this.state.canvas} x={700} y={0} width={140} height={400} id={null}
              QM_Dec={0} QM_Rem={0}/>
        <Rect canvas={this.state.canvas} x={0} y={300} width={560} height={100} select={0} id={null}
              QM_Dec={0} QM_Rem={0}/>
        <Rect canvas={this.state.canvas} x={350} y={300} width={140} height={50} id={'g'}
              QM_Dec={this.state.QM_detected['g']} QM_Rem={this.state.QM_removed['g']}/>
        <Rect canvas={this.state.canvas} x={490} y={300} width={70} height={50} id={'h'}
              QM_Dec={this.state.QM_detected['h']} QM_Rem={this.state.QM_removed['h']}/>
        <Rect canvas={this.state.canvas} x={0} y={400} width={560} height={150} select={0} id={null}
              QM_Dec={0} QM_Rem={0}/>
        {arrayCells2}
        <Rect canvas={this.state.canvas} x={560} y={400} width={140} height={150} id={null}
              QM_Dec={0} QM_Rem={0}/>
        <Rect canvas={this.state.canvas} x={700} y={400} width={140} height={150} id={null}
              QM_Dec={0} QM_Rem={0}/>
      </div>
    )
  }

  componentWillMount(){
    graphStore.addChangeListener(this.update);
    this.setState({
      canvas: this.props.canvas
    })
  }

  update(){
    this.setState({
      QM_detected: graphStore.getQmDec(),
      QM_removed: graphStore.getQmRem()
    });

  }

  componentWillUnmount(){
    graphStore.removeChangeListener(this.update);
  }
}
Grid.propTypes = {
  canvas: React.PropTypes.object.isRequired
};

class Axis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: {}
    };
  }

  render(){
    return(null)
  }

  componentWillMount(){
    this.setState({
      canvas : this.props.canvas
    })
  }

  componentDidMount(){
    var numberPercent=["200%","120%","100%","80%","60%","40%","20%","0%","-20%","-30%"];
    var numberValue=["2","10","20","30","50","80","160","320"];
    for (let i = 0; i < numberPercent.length; i++) {
      if (i < numberValue.length) {
        this.axisX = new fabric.Text(numberValue[i], {
          fontSize: 15,
          top: 407,
          left: (i * 69) + 54,
          selectable: false
        });
        this.state.canvas.add(this.axisX);
      }
      this.axisY= new fabric.Text(numberPercent[i],{
        fontSize: 15,
        top: (i+0.8)*50,
        left: 0,
        selectable: false
      });
      this.state.canvas.add(this.axisY);
    }
    this.axisXX = new fabric.Text("5000", {
      fontSize: 15,
      top: 407,
      left: 620,
      selectable: false
    });
    this.state.canvas.add(this.axisXX);
    this.axisXXX = new fabric.Text("5000[mm]", {
      fontSize: 15,
      top: 407,
      left: 760,
      selectable: false
    });
    this.state.canvas.add(this.axisXXX);
  }
}
Axis.propTypes = {
  canvas: React.PropTypes.object.isRequired
};

class Graph extends React.Component {
  render() {
    var {canvas} = this.props;
    return (
      <div>

        <Columns canvas={canvas} />
        <Grid canvas={canvas}/>
        <Axis canvas={canvas}/>
      </div>
    )
  }

componentWillMount(){
    graphActions.startLoadValue();
  }

  componentWillUnmount(){
    graphActions.stopLoadValue();
  }
}
Graph.propTypes = {
  canvas: React.PropTypes.object.isRequired,
};

class Print extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: null,
    }
  }

  shouldComponentUpdate(nextProps,nextState){
    return this.state.canvas !== nextState.canvas;
  }

  componentDidMount()
  {
    this.setState({
      canvas: new fabric.Canvas(this.refs.canvas),
    });
  }

  componentDidUpdate(){
    this.props.readyToRender();
  }

  render() {
    return (
      <div className="subMaster">
        <div className="container">
          <canvas className="canvas" ref="canvas" width="895" height="560"></canvas>
          <div>
            {this.state.canvas !== null ? <Graph canvas={this.state.canvas} /> : false}
          </div>
        </div>
      </div>
    )
  }
}

export default Print;








