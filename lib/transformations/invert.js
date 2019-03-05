
let invertLeftRight = function(pixel_data) {

	if(!pixel_data.data){
		console.log("ImageProcessor: No image initialized")
		return
	}

	let { data, width, height } = pixel_data 

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width / 2; x++) {
			let idx = (width * y + x) * 4

			let inverse_index = (width * y + (width - x - 1)) * 4

			for(let z = 0; z < 4; z++){
				let temp = data[idx + z]
				data[idx + z] = data[inverse_index + z]
				data[inverse_index + z] = temp
			}
			
		}
	}
	return pixel_data
}

let invertUpDown = function(pixel_data){
	if(!pixel_data.data){
		console.log("ImageProcessor: No image initialized")
		return
	}

	let { data, width, height } = pixel_data 

	for (let y = 0; y < height / 2; y++) {
		for (let x = 0; x < width; x++) {
			let idx = (width * y + x) * 4

			let inverse_index = (width * (height - y - 1) + x) * 4

			for(let z = 0; z < 4; z++){
				let temp = data[idx + z]
				data[idx + z] = data[inverse_index + z]
				data[inverse_index + z] = temp
			}
			
		}
	}
	return pixel_data
}

module.exports = { invertLeftRight, invertUpDown }