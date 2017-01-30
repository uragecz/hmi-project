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
                            <div className="topIconImage menu">
                            </div>
                            <div className="topIconText" >
                                {data.menuItem.menu}
                            </div>
                        </div>
                        <div className={"topIcon " + (this.state.type === "history")} onClick={this.handleClick.bind(this,"history")}>
                            <div className="topIconImage history">
                            </div>
                            <div className={"topIconText"}>
                                {data.menuItem.history}
                            </div>
                        </div>
                        <div className={"topIcon " + (this.state.type === "favourite")} onClick={this.handleClick.bind(this,"favourite")}>
                            <div className="topIconImage favourite">
                            </div>
                            <div className="topIconText">
                                {data.menuItem.favourite}
                            </div>
                        </div>
                    </div>
                    <div id="menuContent">
                        <div id={"menu"} >
                            {this.state.type === "menu" ? <CircleMenu routes={routes} arr={[90,0,270,180]} xPosition={[170,230,230,170]} yPosition={[170,170,230,230]} from={[0,1,2,3]} index={0} firstItem={180} width={75} data={data} pathName={pathName} /> :
                                this.state.type === "favourite" ? <FavouriteHistory label={data.menuItem.favourite} list={favourite} /> : <FavouriteHistory current={data.menuItem.current} label={data.menuItem.history} list={historyStore.getVisitedLinks()} />}
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

    componentWillUnmount(){
        window.removeEventListener('click', this.pageClick, false);
    }

    pageClick(e) {
        if(e.target.id === 'menuOpen'){
            this.props.update();
        }
    }
}

export default  MainMenu;