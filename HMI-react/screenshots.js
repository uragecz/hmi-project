var screenshots = {
	takeSingleScreen: function(callback){
        chrome.extension.sendMessage({name: 'screenshot'}, function(response) {
            let data = response.screenshotUrl;
            let canvas = document.createElement('canvas');
            let img = new Image();
            img.onload = function() {
                canvas.width = $(window).width();
                canvas.height = $(window).height();
            canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);

            let $canvas = $(canvas);
            $canvas.data('scrollLeft', $(document.body).scrollLeft());
            $canvas.data('scrollTop', $(document.body).scrollTop());

            // Perform callback after image loads
            callback($canvas);
             };
        img.src = data;
        console.log(img.src);
        });
	}
};

export default screenshots;