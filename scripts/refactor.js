(function() {
    var Colorify = function(image) {
        // ELEMENT REFERENCE
        this.image = image;
        // ARRAY WITH COLOR OF EACH IMAGE
        this.colorArray = [];

        getImages(image, this);
    };

    // GET ALL IMAGES
    function getImages(imageSelector, self) {
        var images = document.querySelectorAll(imageSelector);
        // LOOP THROUGH IMAGES
        for (var i = 0; i < images.length; i++) {
            var imgSrc = images[i].getAttribute('src');
            // GET IMAGE AND CREATE CANVAS OF IT
            self.colorArray.push(generateCanvas(imgSrc));
        }
    };

    // CREATE A CANVAS
    function generateCanvas(image) {
        // CREATE CANVAS AND HIDE IT
        var canvas = document.createElement('canvas');
        canvas.style.display = 'none';

        // CREATE IMAGE
        var context = canvas.getContext('2d');
        var canvasImg = new Image();
        canvasImg.src = image;

        // PUT IMAGE IN CANVAS
        context.drawImage(canvasImg, 0, 0);

        return countColors(context);
    }

    // COUNT PIXEL COLORS
    function countColors(context) {
        var canvasData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
        var pixelArray = canvasData.data;
        // ORGANIZE AND STORE COLORS AND TIMES THEY APPEAR
        var colorOccurrence = {};

        for (var i = 0; i < pixelArray.length; i += 4) {
            // JOIN RGB
            var rgb = pixelArray[i] + ', ' + pixelArray[i + 1] + ', ' + pixelArray[i + 2]

            // ADD COLOR TO OBJECT OR CREATE PROPERTY WITH NEW COLOR
            !colorOccurrence[rgb] ? colorOccurrence[rgb] = [rgb, 1] : colorOccurrence[rgb][1] ++;
        }
        return getDominantColors(colorOccurrence);
    }

    // CHECK TIMES EACH COLOR HAS APPEARED
    function getDominantColors(colorOccurrence) {
        var count = 0;
        var topColor;
        
        for (var prop in colorOccurrence) {
            if (colorOccurrence[prop][1] > count) {
                topColor = colorOccurrence[prop][0];
                count = colorOccurrence[prop][1];
            };
        }
        return topColor;
    };
    // GET RGB
    Colorify.prototype.getRGB = function(func) {
        func(this.colorArray);
    }

    window.Colorify = Colorify;

})(window)