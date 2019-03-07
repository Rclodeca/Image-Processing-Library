## Image-Processing-Library
 A JavaScript library for applying a series of transformations to images.

## Features
* Convert an image to grayscale
* Invert an image in the x or y direction

## Code Examples
Example of converting an image to grayscale:
```javascript
let ImgProc = new ImageProcessor()

ImgProc.init("image.png").then(() => {
  //convert image to grayscale
  ImgProc.grayscale()

})
```

Example of inverting an image in the x direction:
```javascript
let ImgProc = new ImageProcessor()

ImgProc.init("image.png").then(() => {
  //invert image
  ImgProc.invert('x-axis')

})
```

## Installation
Follow these steps to use this library in your own project.  
1. Clone the repo.
```
$ git clone https://github.com/Rclodeca/Image-Processing-Library
$ cd Image-Processing-Library
```
2. Install dependencies
```javascript
$ npm install
```
3. Require to use the project
```javascript
const ImageProcessor = require('Path_to_index.js_here');
```
Additionally to test it:
```javascript
$ npm test
```
Ideally this would actually be an `npm install ImageProcessor`
## API Reference

#### class ImageProcessor()

Create an ImageProcessor object.
```javascript
let IP = new ImageProcessor();
```

#### init(file)

`file` is a `string` with the path to the image file.  
Initialize the file that is to be transformed. Supported file types are `.jpg` and `.png`. Init() is asynchronous so you must use a callback function to preform the transformations.
```javascript
let IP = new ImageProcessor()

IP.init("image.png").then(() => {
  //do something 
})
```

### Transformations
Methods of `ImageProcessor` to transform images.

#### grayscale()

Transforms the image to grayscale.
```javascript
let IP = new ImageProcessor()

IP.init("image.png").then(() => {
  IP.grayscale() 
})
```

#### invert(type)

`type` is a `string` containing either 'x-axis' for left-right inverting or 'y-axis' for up-down inverting. If `type` is left out, the default is 'x-axis'.  
Inverts the image in either the x or y direction.  
Example of x direction:  
```javascript
let IP = new ImageProcessor()

IP.init("image.png").then(() => {
  IP.invert('x-axis')
})
```
Example of y direction:
```javascript
let IP = new ImageProcessor()

IP.init("image.png").then(() => {
  IP.invert('y-axis')
})
```

## Tests
Tests all methods of ImageProcessor.
```
npm test
```

## License

MIT © [Rclodeca]()
