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
                    <div className="helpItem" id="printOne" onClick={this.printOnePage.bind(this)}>
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
        let page = document.getElementById('appContainer');
        document.getElementById('helpPage').style.display= 'none';

        domtoimage.toPng(page)
            .then(function (dataUrl) {
                let img = new Image();
                img.src = dataUrl;
                $(img).appendTo('body');
                document.getElementById('helpPage').style.display= '';
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }

    take(targetElem) {
    // First render all SVGs to canvases
        let elements = $(targetElem).find('svg').map(function() {
            let svg = $(this);
            let canvas = $('<canvas></canvas>');
            svg.replaceWith(canvas);

            // Get the raw SVG string and curate it
            let content = svg.wrap('<p></p>').parent().html();
            content = content.replace(/xlink:title="hide\/show"/g, "");
            content = encodeURIComponent(content);
            svg.unwrap();

            // Create an image from the svg
            let image = new Image();
            image.src = 'data:image/svg+xml,' + content;
            image.onload = function() {
                canvas[0].width = image.width;
                canvas[0].height = image.height;

                // Render the image to the canvas
                let context = canvas[0].getContext('2d');
                context.drawImage(image, 0, 0);
            };
            return {
                svg: svg,
                canvas: canvas
            };
        });

        $(targetElem).imagesLoaded(function() {

            // At this point the container has no SVG, it only has HTML and Canvases.

            html2canvas(targetElem[0], {
                allowTaint: true,
                onrendered: function(canvas) {
                    // Put the SVGs back in place
                    elements.each(function() {
                        this.canvas.replaceWith(this.svg);
                    });
                    // Do something with the canvas, for example put it at the bottom
                    $(canvas).appendTo('body');
                    document.getElementById('helpPage').style.display= '';
                }
            })

        })
    }
}

export default Help;