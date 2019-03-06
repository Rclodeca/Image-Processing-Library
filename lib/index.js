const getPixels = require("get-pixels")
const imagePixels = require("image-pixels")
const fs = require('fs')
const transformToGrayscale = require("./transformations/grayscale")
const { invertLeftRight, invertUpDown } = require("./transformations/invert")
PNG = require('pngjs').PNG;


class ImageProcessor {
    /**
    * ImageProcessors are objects that can preform transformations on images.
    * Transformations include converting the image to grayscale and inverting
    * the image. Suported file types are .jpg and .png.
    */
    constructor() {}
        /**
        * Constructs an ImageProcessor object.
        */

    async init(file) {
        /**
        * Initialize an imageProcessor object. Must be called after the
        * constructor to pass a file path to the object.
        * 
        * @param {string} file  
        *   The image file path. Supported types are .jpg and .png.
        */
		this.file = file

        //get pixel data from the image
        let promise = this._getPixelData()
        this.pixel_data = await promise 
    }

    async _getPixelData(){
        /*
        * Private method. Gets and returns an object contatining pixel data.
        *
        * @access private
        * @returns {object}
        *   An object contatining: data: an array of RGBA values. Format is
        *   [r,g,b,a,r,g,b,a,...] every 4 indecies represents one pixel.
        *   width: width of the image in pixels. height: height of the image
        *   in pixels.
        */
    	try {
    		let { data, width, height } = await imagePixels(this.file)
    		return { data: data, width: width, height: height }
    	} 
    	catch(e) {
    		console.log("ImageProcessor: Error opening file.")
    	} 
    }
    
    grayscale() {
        /**
        * Preforms a transformation on the image to convert it to grayscale. 
        * Calls a function from ./transformations/grayscale.js.
        */
        //convert the pixels to grayscale
        let grayscale_image = transformToGrayscale(this.pixel_data)
        //draw the new image
        this._toPNG(grayscale_image)
    }

    invert(type="x-axis") {
        /**
        * Preforms a transformation on the image to invert it in the x
        * direction or the y direction.
        *
        * @param {string} type
        *   Optional type should either be 'x-axis' or 'y-axis'. Default is
        *   'x-axis'
        */
    	if(type != "x-axis" && type != "y-axis"){
    		console.log("ImageProcessor: Invalid invert type. Must be 'x-axis' or 'y-axis'")
    		return
    	}

    	let inverted_image = {}

        //invert pixel data in the x direction
    	if(type == "x-axis"){
    		inverted_image = invertLeftRight(this.pixel_data)
    	}
        //invert pixel data in the y directs
    	else if(type == "y-axis"){
    		inverted_image = invertUpDown(this.pixel_data)
    	}

        //draw new image
    	this._toPNG(inverted_image)
    }

    _toPNG(pixel_data) {
        /**
        * Private method. Takes a set of pixel data and draws a new image.
        *
        * @param {object} pixel_data
        *   An object contatining: data: an array of RGBA values. Format is
        *   [r,g,b,a,r,g,b,a,...] every 4 indecies represents one pixel.
        *   width: width of the image in pixels. height: height of the image
        *   in pixels.
        */
    	let { data, width, height } = pixel_data

    	if(!data || !width || !height){
    		console.log("ImageProcessor: No image initialized")
    		return
    	}

        //create new PNG object
    	let png = new PNG({
    		width: width,
    		height: height,
    		filterType: -1
    	});

        //populate PNG object with pixel data
    	for (let y = 0; y < png.height; y++) {
    		for (let x = 0; x < png.width; x++) {
    			let idx = (png.width * y + x) * 4;

    			png.data[idx] = data[idx];
    			png.data[idx + 1] = data[idx + 1];
    			png.data[idx + 2] = data[idx + 2];
    			png.data[idx + 3] = data[idx + 3];
    		}
    	}

        //Draw the new image
    	png.pack().pipe(fs.createWriteStream(this.file));
    }

};

module.exports = ImageProcessor;