(function(window) {
    var Colorify = function(image) {
        // ELEMENT REFERENCE
        this.image = image;
        // ARRAY WITH COLOR OF EACH IMAGE (Set as string)
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
        // Set array with dominant colors.
        /*
        var count = 0;
        var topColor; 

        for (var prop in colorOccurrence) {
            if (colorOccurrence[prop][1] > count) {
                topColor = colorOccurrence[prop][0];
                count = colorOccurrence[prop][1];
            }
        }

        */
        var topColors = [[0, 100], [0, 1000], [0, 8], [0, 4], [0,0]];
        // Iterate through all the objects.
        for (var prop in colorOccurrence) {
            var level = 1;
            var color = colorOccurrence[prop]
            if (color[1] > topColors[topColors.length - 1][1]) {
                while (color[1] > topColors[topColors.length - level][1] && level < 5) {
                    level ++
                }
                // Make it a for loop instead of a while. with an if inside to checj if values is higher or not.
                console.log(level)
                level == 5 ? topColors.push(color) : topColors.splice(topColors.length - level, 0, color);
            }
            
        }

        return topColors;
        // Check if object would be in the top 5

        // check if top 4
    };

    // GET RGB
    Colorify.prototype.getRGB = function(func) {
		console.log(this.colorArray)
        func(this.colorArray);
    };

    window.Colorify = Colorify;

})(window);
