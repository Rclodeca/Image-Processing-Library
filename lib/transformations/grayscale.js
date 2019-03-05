
let grayscale = function(pixel_data) {

	if(!pixel_data.data){
		console.log("ImageProcessor: No image initialized")
		return
	}

	let { data, width, height } = pixel_data 

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			let idx = (width * y + x) * 4;

			let red = data[idx]
			let green = data[idx + 1] 
			let blue = data[idx + 2] 

			let grey = (red + green + blue) / 3

			data[idx] = data[idx + 1] = data[idx + 2] = grey;
		}
	}
	return pixel_data
}

module.exports = grayscale