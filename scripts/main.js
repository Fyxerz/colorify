window.onload = function() {

    var color = new Colorify('.image');
    // var color2 = new Colorify('.image2');

    var colorColors = color.colors()


	var backgrounds = document.querySelectorAll('.container')
	var titles = document.querySelectorAll('.main_title')

	loop(backgrounds, function(item, i) {
		console.log(i)
		item.style.background = "rgb(" + colorColors[i][0][0] + ")"
	})

	loop(titles, function(item, i) {
		console.log(i)
		item.style.color = "rgb(" + colorColors[i][4][0] + ")"
	})

	function loop(array, callback) {
		for (i = 0; i < array.length; i++) {
			callback(array[i], i)
		}
	}



}
