window.onload = function() {

    var color = new Colorify('.image');
    var color2 = new Colorify('.image2');

    color.getRGB(function(colors) {
        var containers = document.querySelectorAll('.container');        
        for (var i = 0; i < containers.length; i++) {
            containers[i].style.background = 'rgb(' + colors[i] + ')'
        }
    });

    color2.getRGB(function(colors) {
       var containers = document.querySelectorAll('.container');        
        for (var i = 0; i < containers.length; i++) {
            containers[i + 2].style.background = 'rgb(' + colors[i] + ')'
        } 
    })
}
