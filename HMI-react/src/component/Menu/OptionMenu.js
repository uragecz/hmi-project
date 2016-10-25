/**
 * Created by urunzl on 13.9.2016.
 */
/**
 * Created by urunzl on 12.9.2016.
 */
import React,{Component} from 'react';
import CircleMenu from './CircleMenu';
import goBack from '../../../assets/back.png';
import goFoward from '../../../assets/forward.png';
import openMenu from '../../../assets/sort-up.png';
import goFavourite from '../../../assets/favorite.png';
import goHistory from '../../../assets/history.png';
import { browserHistory } from 'react-router';
import FavouriteHistory from './FavouriteHistory';
import favourite from '../../route/favourite';
import historyStore from '../../stores/historyStore';

class OptionMenu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            type: "menu"
        }
    }

    render(){
        const {show,...others} = this.props;
        return(
            <div id="menuOpen">
                <div id={show? "menu" : "hide-menu"} >
                    {this.state.type === "menu" ? <CircleMenu arr={[90,0,270,180]} xPosition={[170,230,230,170]} yPosition={[170,170,230,230]} from={[0,1,2,3]} index={0} firstItem={180} width={75} {...others} /> :
                        this.state.type === "favourite" ? <FavouriteHistory label={this.props.data.menu.favourite} list={favourite} /> : <FavouriteHistory current={this.props.data.menu.current} label={this.props.data.menu.history} list={historyStore.getVisitedLinks()} />}
                </div>
                <div className={show? "option open" : "option close"}>
                    <div className="icon first">
                        <img id="openMainMenu" onClick={this.goDirection.bind(this,'back')} src={goBack}/>
                    </div>
                    <div className={"icon second top " + (this.state.type === "history" ? "active" : false)}>
                        <img id="openMainMenu" onClick={this.handleClick.bind(this,true,"history")} src={goHistory}/>
                    </div>
                    <div className={"icon middle " + (this.state.type === 'menu' ? "active" : false)}>
                        <img id="openMainMenu" onClick={this.handleClick.bind(this,true,"menu")} src={openMenu}/>
                    </div>
                    <div className={"icon second bottom " + (this.state.type === "favourite" ? "active" : false)}>
                        <img id="openMainMenu" onClick={this.handleClick.bind(this,true,"favourite")} src={goFavourite}/>
                    </div>
                    <div className="icon first last">
                        <img id="openMainMenu" onClick={this.goDirection.bind(this,'forward')} src={goFoward}/>
                    </div>
                </div>
            </div>
        )
    }
    handleClick(show,type){
        this.props.update(show);
        this.setState({
            clicked : show,
            type : type
        })

    }

    componentDidMount(){
        window.addEventListener('mousedown', this.pageClick.bind(this), false);
    }

    pageClick(e) {
        if(e.target.id === 'menuOpen'){
            this.handleClick(false,this.state.type);
        }
    }

    goDirection(direction){
        switch(direction){
            case 'forward':
                browserHistory.goForward();
                break;
            case 'back':
                browserHistory.goBack();
                break;
            default:
                break;
        }
    }
}

export default OptionMenu;