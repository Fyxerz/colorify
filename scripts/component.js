(function(window) {

    function Colorify(image) {
        this.image = image;
            // ARRAY COLLECTING RGBS
        colorArray = [];
        this.getClosest = function(parent) {
            var imageNodes = document.querySelectorAll(this.image);

            for (var i = 0; i < imageNodes.length; i++) {
                var closest = imageNodes[i].closest(parent);
            
                closest.style.background = 'rgb(' + colorArray[i] + ')';
                console.log(colorArray);
            };

        };
        this._init();
    };

    Colorify.prototype._init = function() {
        getImage(this.image);
    }

        function getImage(image) {
        var image = document.querySelectorAll(image);
        for (var i = 0; i < image.length; i++) {
            var imgSrc = image[i].getAttribute('src');

            generateCanvas(imgSrc, image[i]);
        }

    }

    function generateCanvas(imgSrc, image) {
        var image = image;
        var canvas = document.createElement('canvas');

        canvas.style.display = 'none';
        var context = canvas.getContext('2d');
        var img = new Image();
        img.src = imgSrc;

        //TODO NEED TO LOAD AFTER IMAGE IS LOADED IN CANVAS
        context.drawImage(img, 0, 0);

        countColor(canvas, context, image);
    }

    function countColor(obj, context, image) {
        var imgData = context.getImageData(0, 0, obj.width, obj.height);
        var pix = imgData.data;
        var colorOccurrence = {};

            // Loop over each pixel and invert the color.
        for (var i = 0, n = pix.length; i < n; i += 4) {
            var r = pix[i];
            var g = pix[i + 1];
            var b = pix[i + 2];

            var rgb = ' ' + r + g + b;

            if (!colorOccurrence[rgb]) {
                    // LAST NUMBER IS THE COUNT OF THE COLOR
                colorOccurrence[rgb] = [r, g, b, 1];
            }
            else {
                colorOccurrence[rgb][3]++;
            }
        }
        iterateColorOcurrence(colorOccurrence, image);
    }

    function iterateColorOcurrence(object, image) {
        var maxProperty = 0;

        for (var prop in object) {
            if (object[prop][3] > maxProperty) {
                maxProperty = object[prop];
            }
        }
        joinRGB(maxProperty, image);
    }

    function joinRGB(maxProperty, image) {
        maxRGB = maxProperty[0] + ',' + maxProperty[1] + ',' + maxProperty[2];
        colorArray.push(maxRGB);
    }


window.Colorify = Colorify;

})(window);


color = new Colorify('.image');
color2 = new Colorify('.image2');

color.getClosest('.container');

