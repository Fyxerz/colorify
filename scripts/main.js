
function init() {
    getImage('img');
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

    canvas.classList.add('the_canvas');
    canvas.style.display = 'none';
    var context = canvas.getContext('2d');
    var img = new Image();
    img.src = imgSrc;

    //TODO NEED TO LOAD AFTER IMAGE IS LOADED IN CANVAS
    context.drawImage(img, 0, 0);

    return reverseColor(canvas, context, image);
}

function reverseColor(obj, context, image) {
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
            colorOccurrence[rgb] = [r, g, b, 1];
        }
        else {
            colorOccurrence[rgb][3]++;
        }
    }
    iterateObject(colorOccurrence, image);
}

function iterateObject(object, image) {
    var maxProperty = 0;

    for (var prop in object) {
        // console.log(object[prop])
        if (object[prop][3] > maxProperty) {
            maxProperty = object[prop];
        }

    }
    joinRGB(maxProperty, image);
}

function joinRGB(maxProperty, image) {
    maxRGB = maxProperty[0] + ',' + maxProperty[1] + ',' + maxProperty[2];
    useClosest(image, '.container', maxRGB);

    console.log(maxRGB);
}

function useClosest(el, parentClass, RGB) {

    var parent = el.closest('.container');

    parent.style.background = 'rgb(' + maxRGB + ')';
}

init();

