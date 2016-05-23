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
        var topColors = [[0, 0],[0, 0], [0, 0], [0, 0], [0,0]];

        // Iterate through all the objects.
        for (var prop in colorOccurrence) {
            // Set index level for the color regarding count.
            var level = 1;

            // Check if new color is top color.
            var color = colorOccurrence[prop]
           if (color[1] > topColors[4][1]) {
            // Check position in array regarding counts.
            while (color[1] > topColors[topColors.length - level][1] && level < topColors.length) {
                level ++          
            }
            // If color is most appearing, then push, if not splice in level position.
            level == topColors.length && color[1] > topColors[0][1] ? topColors.unshift(color) : topColors.splice(topColors.length - level + 1, 0, color) 
            // Cut array so that it doesn't become massive with all the colors.
            topColors.splice(topColors.length - 1, 1)
           }
        }
        return topColors;
    };

    // Present topColors
    Colorify.prototype.colors = function() {
        return this.colorArray;
    }

    window.Colorify = Colorify;

})(window);
