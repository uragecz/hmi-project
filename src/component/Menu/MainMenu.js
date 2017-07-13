/**
 * Created by urunzl on 13.10.2016.
 */
//components/stores/actions
import React,{Component} from 'react';
import favourite from '../../route/favourite';
import historyStore from '../../stores/historyStore';
import CircleMenu from './CircleMenu';
import FavouriteHistory from './FavouriteHistory';

//styles and images
import './Menu.css';

const active= "#244c5a";
const notActive= "#97a6ac";

var svgStyle = {};

class MainMenu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            type: "menu"
        };
        this.pageClick = this.pageClick.bind(this);
    }

    render(){
        const { data, pathName, routes } = this.props;
        return(
            <div id="menuOpen" className="opacityBoxMenu" >
                <div className="option">
                    <div id="topOption">
                        <div className={"topIcon " + (this.state.type === 'menu')} onClick={this.handleClick.bind(this,"menu")} >
                            <svg width={28} height={85} fill={this.state.type === 'menu' ? active : notActive}>
                                <rect width="12" height="12" x={0} y={30}/>
                                <rect width="12" height="12" x={15} y={30}/>
                                <rect width="12" height="12" x={0} y={45}/>
                                <rect width="12" height="12" x={15} y={45}/>
                            </svg>
                            <div className="topIconText" >
                                {data.menuItem.menu}
                            </div>
                        </div>
                        <div className={"topIcon " + (this.state.type === "history")} onClick={this.handleClick.bind(this,"history")}>
                            <svg width={28} height={85} fill={this.state.type === 'history' ? active : notActive} viewBox="0 0 510 510">
                                <path d="M267.75,12.75c-89.25,0-168.3,48.45-209.1,122.4L0,76.5v165.75h165.75
                                l-71.4-71.4c33.15-63.75,96.9-107.1,173.4-107.1C372.3,63.75,459,150.45,459,255s-86.7,191.25-191.25,191.25
                                c-84.15,0-153-53.55-181.05-127.5H33.15c28.05,102,122.4,178.5,234.6,178.5C402.9,497.25,510,387.6,510,255
                                C510,122.4,400.35,12.75,267.75,12.75z M229.5,140.25V270.3l119.85,71.4l20.4-33.15l-102-61.2v-107.1H229.5z"/>
                            </svg>
                            <div className={"topIconText"}>
                                {data.menuItem.history}
                            </div>
                        </div>
                        <div className={"topIcon " + (this.state.type === "favourite")} onClick={this.handleClick.bind(this,"favourite")}>
                            <svg width={28} height={85} fill={this.state.type === 'favourite' ? active : notActive} viewBox="0 0 19.481 19.481">
                                <path d="m 10.201,0.758 2.478,5.865 6.344,0.545 c 0.44,0.038 0.619,0.587 0.285,0.876 l -4.812,4.169 1.442,6.202
                                    c 0.1,0.431 -0.367,0.77 -0.745,0.541 L 9.741,15.668 4.289,18.956 C 3.91,19.184 3.444,18.845 3.544,18.415 L 4.986,12.213 0.173,8.043
                                    C -0.161,7.754 0.017,7.205 0.458,7.167 L 6.802,6.622 9.28,0.758 c 0.172,-0.408 0.749,-0.408 0.921,0 z"/>
                            </svg>
                            <div className="topIconText">
                                {data.menuItem.favourite}
                            </div>
                        </div>
                    </div>
                    <div id="menuContent">
                        <div id={"menu"} >
                            {this.state.type === "menu" ? <CircleMenu css={svgStyle} routes={routes} arr={[90,0,270,180]} xPosition={[170,230,230,170]} yPosition={[170,170,230,230]} from={[0,1,2,3]} index={0} firstItem={180} width={75} data={data} pathName={pathName} /> :
                                this.state.type === "favourite" ? <FavouriteHistory css={svgStyle} label={data.menuItem.favourite} list={favourite} /> : <FavouriteHistory css={svgStyle} current={data.menuItem.current} label={data.menuItem.history} list={historyStore.getVisitedLinks()} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleClick(type){
        this.setState({
            type : type
        });
    }

    componentDidMount(){
        window.addEventListener('click', this.pageClick, false);
    }

    componentWillMount(){
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        let svgWidth= width/450;
        if(svgWidth < 1) {
            svgWidth -= 0.05;
            svgWidth.toFixed(3);
            svgStyle = {
                transform: 'scale('+svgWidth+')'
            }
        }
    }

    componentWillUnmount(){
        window.removeEventListener('click', this.pageClick, false);

    }

    pageClick(e) {
        if(e.target.id === 'menuOpen' || e.target.id === 'menu'){
            this.props.update();
        }
    }
}

export default  MainMenu;