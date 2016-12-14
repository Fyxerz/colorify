const Colorify = function(img) {

// Get img
const image = document.querySelector(img)

// Get img source
const imageSrc = image.getAttribute('src')

// Create an empty canvas 
const canvas = document.createElement('canvas')

// Set image in canvas
const context = canvas.getContext('2d')
context.drawImage(image, 0 , 0)

// Iterate through every pixel
// Get pixel data
const canvasData = context.getImageData(0, 0, context.canvas.width, context.canvas.height)

const colors = {}

	// Check color of every pixel
for (var i = 0; i < canvasData.data.length; i += 4) {
// Join RGB in color
	const rgb = `${canvasData.data[i]}, ${canvasData.data[i+1]}, ${canvasData.data[i+2]}`

	// Is it in the array of known colors?
		// NO: Add color to array
		// YES: Add 1 to color counter
	!colors[rgb] ? colors[rgb] = [rgb, 1] : colors[rgb][1] ++
}

const topColors = []

	// Loop through each color
for (var color in colors) {
		// Get more comfortable for each color
	const selectedColor = colors[color]
		// Make objects an array
    topColors.push([selectedColor[0], selectedColor[1]])
}

	// Clean array
const givenColors = topColors.sort((a, b) => b[1] - a[1]).map(item => item.shift())

console.log('Done')
console.log(givenColors)
}

// TODO:

// Only give colors with a 10% difference in R, G or B
// Get variables for amount of topcolors
// Clean the fucking code
// Clean the array

// module.exports = Colorify


