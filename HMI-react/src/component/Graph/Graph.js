/**
 * Created by Lukáš on 6/13/2016.
 */
import React from 'react';
import graphStore from '../../stores/graphStore';
import graphActions from '../../actions/graphActions'
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
      return (<div></div>);
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
        fill: 'rgba(0, 0, 0, 0)',
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
        border: "#e2ea66",
        fill: "#e2ea66",
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
        border: "#e2ea66",
        fill: "#e2ea66",
      });
      this.state.canvas.add(this.column);
    }
    this.state.canvas.moveTo(this.column, 3); // set level of stack
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
      channels: this.props.channels,
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.channels !== this.props.channels){
      this.setState({
        channels: nextProps.channels
      })
    }
  }

  render() {
    let i = -1;
    return(
      <div>
          {Object.keys(this.state.channels).map(function (item) {
            let model = this.state.channels[item];
            i++;
            let shape = [];
            Object.keys(model).map(function(it){
              shape.push(model[it].value);
            });
            console.log('rect - ',this.getX(shape[1]),this.getY(shape[0]),this.getWidth(i));
            return (
                <Column x={this.getX(shape[1])} height={this.getY(shape[0])} canvas={this.state.canvas} color={'rgba(255,0,0,0.5)'} width={this.getWidth(i)}/>
            )
          },this)}
      </div>
    )
  }

  shouldComponentUpdate(nextProps){
    return (this.props.channels !== nextProps.channels);
  }

  getY(a) {
    if (a===0)
      return 0;
    let numbers = [300, 200, 120, 100, 80, 60, 40, 20, 0, -20, -30];
    let i = 0;
    let number = 0;
    for (;i < numbers.length; i++) {
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
    let numbers=[2, 10, 20, 30, 50, 80, 160, 320, 5000];
    let i = 0;
    let number = 0;
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
    let number = 0;
    let i = e + 1;
    let helpNum = -1;
    let actualItemValue;
    let helpArr = [];
    for (let key in this.state.channels) {
        helpArr = [];
        helpNum++;
        if(helpNum === e){
            let model = this.state.channels[key];
            Object.keys(model).map(function (item) {
                helpArr.push(model[item]);
            });
            actualItemValue = this.getX(helpArr[1].value);
        }
        if (helpNum >= i && i < 8) {
            let model = this.state.channels[key];
            Object.keys(model).map(function (item) {
                helpArr.push(model[item]);
            });
            if (helpArr[1].value > 0) {
                number = this.getX(helpArr[1].value);
                break;
            }
        }
        else if (helpNum >= i && i > 8){
            let model = this.state.channels[key];
            Object.keys(model).map(function (item) {
                helpArr.push(model[item]);
            });
            if (helpArr[1].value > 0) {
                number = this.getX(helpArr[1].value);
                break;
            }
        }

    }
    return number === 0 ? (840 - actualItemValue) : ((number-actualItemValue) + 0.15);
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
    let arrayCells = [];
    let arrayCells2 = [];
    let letters1 = ['a','b','c','d','e'];
    let letters2 = ['i','j','k'];

    for (let i = 0; i < 8; i++){
      let num1 = 6;
      let num2 = 1;
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
        <Rect canvas={this.state.canvas} x={0} y={0} width={840} height={550} select={0} id={null}
              QM_Dec={0} QM_Rem={0}/>
        <Rect canvas={this.state.canvas} x={0} y={300} width={560} height={100} select={0} id={null}
              QM_Dec={0} QM_Rem={0}/>
        <Rect canvas={this.state.canvas} x={0} y={400} width={560} height={150} select={0} id={null}
              QM_Dec={0} QM_Rem={0}/>
        {arrayCells}
        <Rect canvas={this.state.canvas} x={350} y={0} width={210} height={300} id={'f'}
              QM_Dec={this.state.QM_detected['f']} QM_Rem={this.state.QM_removed['f']}/>
        <Rect canvas={this.state.canvas} x={560} y={0} width={140} height={400} id={null}
              QM_Dec={0} QM_Rem={0}/>
        <Rect canvas={this.state.canvas} x={700} y={0} width={140} height={400} id={null}
              QM_Dec={0} QM_Rem={0}/>

        <Rect canvas={this.state.canvas} x={350} y={300} width={140} height={50} id={'g'}
              QM_Dec={this.state.QM_detected['g']} QM_Rem={this.state.QM_removed['g']}/>
        <Rect canvas={this.state.canvas} x={490} y={300} width={70} height={50} id={'h'}
              QM_Dec={this.state.QM_detected['h']} QM_Rem={this.state.QM_removed['h']}/>
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
  render(){
    const {canvas} = this.props;
    canvas.getContext()
    return (
      <div>
        <Grid canvas={canvas}/>
        <Columns channels={this.props.channels} canvas={canvas} />
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
    return this.state.canvas !== nextState.canvas || this.props.channels !== nextProps.channels;
  }

  componentDidMount()
  {
    this.setState({
      canvas: new fabric.Canvas(this.refs.canvas),
    });

    let context  = document.getElementById("contextCanvas").getContext('2d');
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
  }

  componentWillMount(){
      const graphContainer = document.getElementById('graphColumn');
      canWidth= ''+(graphContainer.offsetWidth/CANVAS_WIDTH) * 100 ;
      if (canWidth < 100){
          canWidth= parseFloat('0.' + graphContainer.offsetWidth);
          canWidth += 0.08;
      }
      else{
          canWidth = canWidth.slice( 1 );
          canWidth= parseFloat('1.' + canWidth);
          canWidth += 0.08;
      }
      canWidth.toFixed(3);
      console.log(canWidth);
      canvasStyle = {
          transform : 'scale('+canWidth+')',
          transformOrigin : 'top right'
      };
  }

  render() {
    return (
        <div id="graph-container">
          <canvas style={canvasStyle} id="contextCanvas" className="canvas" ref="canvas" width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
          <div>
            {this.state.canvas !== null ? <Graph canvas={this.state.canvas} channels={this.props.channels} /> : false}
          </div>
        </div>
    )
  }
}

const CANVAS_WIDTH = 895;
const CANVAS_HEIGHT = 560;
var canWidth;
var canvasStyle = {};
export default Print;








