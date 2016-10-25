/**
 * Created by urunzl on 29.9.2016.
 */
import React,{Component} from 'react';
import './Options.css';
import goBack from '../../../assets/plus.png';
import goForward from '../../../assets/minus.png';
import openMenu from '../../../assets/menu.png';
import NumpadModal from '../ModalWindow/NumpadModal';
import ListModal from '../ModalWindow/ListModal';
import selectionStore from '../../stores/selectionStore'
import selectionActions from '../../actions/selectionActions';
import Option from './Option';

class Options extends Component{
    constructor(props){
        super(props);
        this.state = {
            xPos : [16, 35, 60, 65],
            yPos : [100, 155, 175, 180],
            xRot : [0, 68, 82, 90],
            yRot : [0, 182, 202, 207],
            prevAngleInRadians: null,
            previousX: null,
            previousY: null,
            unit: parseInt(selectionStore.getActiveUnit(),10),
            group: selectionStore.getActiveGroup(),
            shift: selectionStore.getActiveShift(),
            step: selectionStore.getUnitStep(),
            minUnit: selectionStore.getMinUnit(),
            maxUnit: selectionStore.getMaxUnit(),
            shiftList: selectionStore.getShiftList(),
            groupList: selectionStore.getGroupList(),
            activeType: 'group',
            showList: false
        };
        this.handleOpenList = this.handleOpenList.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.changeActiveOption = this.changeActiveOption.bind(this);
        this.update = this.update.bind(this);
    }

    componentWillMount(){
        selectionStore.addChangeListener(this.update);
        let prevAngle = -270 * (Math.PI / 180.0);
        let prevX = 125 + (125 * Math.cos(prevAngle));
        let prevY = 125 + (125 * Math.sin(prevAngle));
        this.setState({
            prevAngleInRadians : prevAngle,
            previousX: prevX,
            previousY: prevY
        })
    }

    update(){
        this.setState({
            unit: selectionStore.getActiveUnit(),
            shift: selectionStore.getActiveShift(),
            group: selectionStore.getActiveGroup(),
            shiftList: selectionStore.getShiftList(),
            groupList: selectionStore.getGroupList(),
            step: selectionStore.getUnitStep(),
            minUnit: selectionStore.getMinUnit(),
            maxUnit: selectionStore.getMaxUnit()
        });

    }

    componentWillUnmount(){
        selectionStore.removeChangeListener(this.update);
    }

    render(){
        const {options, data} = this.props;
        let posAngle = -(180/options.length);
        let angleInRadians = -(270 + posAngle) * (Math.PI / 180.0);
        let x = 125 + (125 * Math.cos(angleInRadians));
        let y = 125 + (125 * Math.sin(angleInRadians));
        let angle = -posAngle;
        return(
            <div className="right panel">
                <div className="optionPanel">
                    <div className="optionIcon up">
                        <img className="rightOptionIcons" onClick={this.handleChangeValueByOne.bind(this,'+')} src={goBack}/>
                    </div>
                    <div className="optionIcon down">
                        <img className="rightOptionIcons" onClick={this.handleChangeValueByOne.bind(this,'-')} src={goForward}/>
                    </div>
                    <div className="optionCircle">
                        <svg id="svgOption" className="rightOption" width={252} height={252} >
                            {options.map(function(item){
                                posAngle += angle;
                                return(
                                    <Option key={item} posAngle={posAngle} width={125} previousX={this.state.previousX} previousY={this.state.previousY}
                                        x={x} y={y} xRot={this.state.xRot[options.length-1]} yRot={this.state.yRot[options.length-1]}  xPos={this.state.xPos[options.length-1]}
                                            yPos={this.state.yPos[options.length-1]} update={this.changeActiveOption} type={item} activeItem={this.state.activeType === item}
                                            value={item === 'shift' ? this.state.shift : item === 'group' ? this.state.group : this.state.unit}/>
                                )
                            },this)}
                            <g onClick={this.handleOpenList} >
                                <circle cx="125" cy="125" r="50" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="white" />
                                <image href={openMenu} id="menuButton"  x="100" y="100" height="50px" width="50px"/>
                            </g>
                        </svg>
                    </div>
                    {this.state.showList ?
                        (() => {
                            switch (this.state.activeType) {
                                case "unit":
                                    return <NumpadModal onUpdate={this.handleOpenList} min={this.state.minUnit} max={this.state.maxUnit} value={this.state.unit} editValue={this.changeValue}/>;
                                case "group":
                                    return <ListModal title={data.option.group} list={this.state.groupList} onUpdate={this.handleOpenList} />;
                                case "shift":
                                    return <ListModal title={data.option.shift} list={this.state.shiftList} onUpdate={this.handleOpenList} />;
                                case "something":
                                    return false;
                                default:
                                    return false;
                            }
                        })()
                        : false
                    }
                </div>
            </div>
        )
    }

    changeValue(value){
        selectionActions.switchUnit(parseInt(value,10));
        this.setState({
            showList: !this.state.showList
        })
    }

    changeActiveOption(type) {
        this.setState({
            activeType: type,
        })
    }

    handleOpenList(){
        this.setState({
            showList: !this.state.showList
        })
    }

    handleChangeValueByOne(operation){
        if (this.state.activeType === "unit"){
            let number = operation === '+' ? this.state.unit + this.state.step : this.state.unit - this.state.step;
            if (number <= this.state.maxUnit && number >= this.state.minUnit)
                selectionActions.switchUnit(number);
        }
        else if (this.state.type === "group")
            selectionActions.switchGroup();
        else
            selectionActions.switchShift();
    }
}

export default Options;