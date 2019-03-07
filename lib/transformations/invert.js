
const IMAGE_INIT_ERROR = 'ImageProcessor: No image initialized.'

let invertLeftRight = function(pixel_data) {
	/**
	* Inverts the given pixels in the x direction.
	*
	* @param {object} pixel_data
	*	An object contatining: data: an array of RGBA values. Format is
	*   [r,g,b,a,r,g,b,a,...] every 4 indecies represents one pixel.
	*   width: width of the image in pixels. height: height of the image
	*   in pixels.
	* @returns {object} pixel_data
	*	An object contatining: data: an array of RGBA values. Format is
	*   [r,g,b,a,r,g,b,a,...] every 4 indecies represents one pixel.
	*   width: width of the image in pixels. height: height of the image
	*   in pixels.
	*/

	//make result a deep copy of pixel_data
	let new_data = [...pixel_data.data]
	let result = {
		data: new Uint8Array(new_data),
		width: pixel_data.width,
		height: pixel_data.height
	}
	let { data, width, height } = result

	//swap pixels from the right to left side of image
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width / 2; x++) {

			//index of the current pixel
			let idx = (width * y + x) * 4

			//index of the inverse pixel that is to be swapped with
			let inverse_index = (width * y + (width - x - 1)) * 4

			//swap each R,G,B,A value of the current and inverse pixel
			for(let z = 0; z < 4; z++){
				let temp = data[idx + z]
				data[idx + z] = data[inverse_index + z]
				data[inverse_index + z] = temp
			}
		}
	}
	return result
}

let invertUpDown = function(pixel_data){
	/**
	* Inverts the given pixels in the y direction.
	*
	* @param {object} pixel_data
	*	An object contatining: data: an array of RGBA values. Format is
	*   [r,g,b,a,r,g,b,a,...] every 4 indecies represents one pixel.
	*   width: width of the image in pixels. height: height of the image
	*   in pixels.
	* @returns {object} pixel_data
	*	An object contatining: data: an array of RGBA values. Format is
	*   [r,g,b,a,r,g,b,a,...] every 4 indecies represents one pixel.
	*   width: width of the image in pixels. height: height of the image
	*   in pixels.
	*/

	//make result a deep copy of pixel_data
	let new_data = [...pixel_data.data]
	let result = {
		data: new Uint8Array(new_data),
		width: pixel_data.width,
		height: pixel_data.height
	}
	let { data, width, height } = result

	//swap pixels from the bottom to the top of image
	for (let y = 0; y < height / 2; y++) {
		for (let x = 0; x < width; x++) {

			//index of the current pixel
			let idx = (width * y + x) * 4

			//index of the inverse pixel that is to be swapped with
			let inverse_index = (width * (height - y - 1) + x) * 4

			//swap each R,G,B,A value of the current and inverse pixel
			for(let z = 0; z < 4; z++){
				let temp = data[idx + z]
				data[idx + z] = data[inverse_index + z]
				data[inverse_index + z] = temp
			}
		}
	}
	return result
}

module.exports = { invertLeftRight, invertUpDown }