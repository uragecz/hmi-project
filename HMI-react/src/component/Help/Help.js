/**
 * Created by urunzl on 2.12.2016.
 */
//components
import React,{Component} from 'react';
import domtoimage from 'dom-to-image';

//styles, images
import './Help.css'
import printOne from '../../../assets/printOne.png';
import printAll from '../../../assets/printAll.png';
import information from '../../../assets/information.png';

class Help extends Component {
    constructor(props){
        super(props);
        this.pageClick = this.pageClick.bind(this);
    }
    render() {
        return (
            <div id="helpPage" className="opacityBoxMenu">
                <form method="POST" encType="multipart/form-data" action="saveImage.php" id="phpSendForm">
                    <div className="helpItem" onClick={this.printOnePage.bind(this)}>
                        <img src={printOne} width={100} height={100}/>
                    </div>
                    <div className="helpItem">
                        <img src={printAll} width={100} height={100}/>
                    </div>
                    <div className="helpItem">
                        <img src={information} width={100} height={100}/>
                    </div>
                    <input type="hidden" name="img_val" id="img_val" value="" />
                </form>
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener('click', this.pageClick, false)
    }

    componentWillUnmount(){
        window.removeEventListener('click', this.pageClick, false)
    }

    pageClick(e) {
        console.log('page');
        if (e.target.id === 'helpPage') {
            this.closePage();
        }
    }

    closePage(){
        this.props.closeHelpPage();
    }

    printOnePage(){
        document.getElementById('helpPage').style.display= 'none';
        let page = document.getElementById('appContainer');
        /*
        domtoimage.toPng(page)
            .then(function (dataUrl) {
                let img = new Image();
                img.src = dataUrl;
                document.getElementById('helpPage').style.display= '';
                document.body.appendChild(img);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });

*/

        html2canvas(page).then(function(canvas){
           console.log( canvas.toDataURL('image/jpeg', 1.0));
        });

        /*
        html2canvas(page,{
            onrendered: function(canvas) {
                $('#img_val').val(canvas.toDataURL("image/png"));
                console.log(document.getElementById('img_val'));
                //document.getElementById("phpSendForm").submit();
            }
        });
*/
        document.getElementById('helpPage').style.display= '';
    }
}

export default Help;