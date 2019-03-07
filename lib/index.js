const getPixels = require("get-pixels")
const imagePixels = require("image-pixels")
const fs = require('fs')
const transformToGrayscale = require("./transformations/grayscale")
const { invertLeftRight, invertUpDown } = require("./transformations/invert")
PNG = require('pngjs').PNG;


//constants
const IMAGE_INIT_ERROR = 'ImageProcessor: No image initialized.'
const FILE_IO_ERROR = 'ImageProcessor: Error opening file.'
const INVALID_INVERT_ERROR = "ImageProcessor: Invalid invert type. Must be 'x-axis' or 'y-axis'"


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
    		console.log(FILE_IO_ERROR + e)
    	} 
    }
    
    grayscale() {
        /**
        * Preforms a transformation on the image to convert it to grayscale. 
        * Calls a function from ./transformations/grayscale.js.
        */
        if(!this.pixel_data || !this.pixel_data.data){
            console.log(IMAGE_INIT_ERROR)
            return
        }   

        //convert the pixels to grayscale
        let grayscale_image = transformToGrayscale(this.pixel_data)

        this.pixel_data = grayscale_image

        //draw the new image
        this._toPNG(grayscale_image, this.file)
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
        if(!this.pixel_data || !this.pixel_data.data){
            console.log(IMAGE_INIT_ERROR)
            return
        }
    	if(type != "x-axis" && type != "y-axis"){
    		console.log(INVALID_INVERT_ERROR)
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

        this.pixel_data = inverted_image

        //draw new image
    	this._toPNG(inverted_image, this.file)
    }

    _toPNG(pixel_data, file) {
        /**
        * Private method. Takes a set of pixel data and draws a new image.
        *
        * @param {object} pixel_data
        *   An object contatining: data: an array of RGBA values. Format is
        *   [r,g,b,a,r,g,b,a,...] every 4 indecies represents one pixel.
        *   width: width of the image in pixels. height: height of the image
        *   in pixels.
        * @param {string} file
        *   The image file path. Supported types are .jpg and .png.
        */
    	let { data, width, height } = pixel_data

    	if(!data || !width || !height){
    		console.log(IMAGE_INIT_ERROR)
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
    	png.pack().pipe(fs.createWriteStream(file));
    }

};

module.exports = ImageProcessor;