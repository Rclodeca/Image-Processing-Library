
const IMAGE_INIT_ERROR = 'ImageProcessor: No image initialized.'

let grayscale = function(pixel_data) {
	/**
	* Converts the given pixels to grayscale.
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
	if(!pixel_data.data){
		console.log(IMAGE_INIT_ERROR)
		return
	}

	//make result a deep copy of pixel_data
	let new_data = [...pixel_data.data]
	let result = {
		data: new Uint8Array(new_data),
		width: pixel_data.width,
		height: pixel_data.height
	}
	let { data, width, height } = result

	//convert each pixel to grayscale
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {

			//index of current pixel
			let idx = (width * y + x) * 4;

			//get the R,G,B values from the current pixel
			let red = data[idx]
			let green = data[idx + 1] 
			let blue = data[idx + 2] 

			//calculate the grayscale version of the each value
			let grey = (red + green + blue) / 3

			//set the new values
			data[idx] = data[idx + 1] = data[idx + 2] = grey;
		}
	}
	return result
}

module.exports = grayscale