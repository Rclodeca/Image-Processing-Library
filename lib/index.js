const getPixels = require("get-pixels")
const imagePixels = require("image-pixels")
const fs = require('fs')
const transformToGrayscale = require("./transformations/grayscale")
const { invertLeftRight, invertUpDown } = require("./transformations/invert")
PNG = require('pngjs').PNG;


class ImageProcessor {

    constructor() {}

    async init(file) {
		this.file = file

        let promise = this._getPixelData2()
        this.pixel_data = await promise 
    }

    async _getPixelData2(){
    	try {
    		let { data, width, height } = await imagePixels(this.file)
    		return { data: data, width: width, height: height}
    	} 
    	catch(e) {
    		console.log("ImageProcessor: Error opening file")
    	} 
    }
    
    grayscale() {
        let grayscale_image = transformToGrayscale(this.pixel_data)
        this.toPNG(grayscale_image)
    }

    invert(type="x-axis") {
    	if(type != "x-axis" && type != "y-axis"){
    		console.log("ImageProcessor: Invalid invert type. Must be 'x-axis' or 'y-axis'")
    		return
    	}

    	let inverted_image = {}

    	if(type == "x-axis"){
    		inverted_image = invertLeftRight(this.pixel_data)
    	}
    	else if(type == "y-axis"){
    		inverted_image = invertUpDown(this.pixel_data)
    	}
    	this.toPNG(inverted_image)
    }

    toPNG(pixel_data) {
    	let { data, width, height } = pixel_data

    	if(!data || !width || !height){
    		console.log("ImageProcessor: No image initialized")
    		return
    	}

    	let png = new PNG({
    		width: width,
    		height: height,
    		filterType: -1
    	});

    	for (let y = 0; y < png.height; y++) {
    		for (let x = 0; x < png.width; x++) {
    			let idx = (png.width * y + x) * 4;

    			png.data[idx] = data[idx];
    			png.data[idx + 1] = data[idx + 1];
    			png.data[idx + 2] = data[idx + 2];
    			png.data[idx + 3] = data[idx + 3];
    		}
    	}

    	png.pack().pipe(fs.createWriteStream('new14.png'));
    }

};

module.exports = ImageProcessor;