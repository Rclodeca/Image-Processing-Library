const expect = require('chai').expect
const ImageProcessor = require('../lib/index')
const grayscale = require('../lib/transformations/grayscale')
const { invertLeftRight, invertUpDown } = require('../lib/transformations/invert')


//Constants
const LINEAR_PIXEL_ARRAY = new Uint8Array([
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,
	17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,
	33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,
	49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64
])
const LINEAR_PIXEL_DATA = {
	data: LINEAR_PIXEL_ARRAY,
	width: 4,
	height: 4
}

const GRAYSCALE_PIXEL_ARRAY = new Uint8Array([
	2, 2, 2, 4, 6, 6, 6, 8, 10,10,10,12,14,14,14,16,
	18,18,18,20,22,22,22,24,26,26,26,28,30,30,30,32,
	34,34,34,36,38,38,38,40,42,42,42,44,46,46,46,48,
	50,50,50,52,54,54,54,56,58,58,58,60,62,62,62,64
])
const GRAYSCALE_PIXEL_DATA = {
	data: GRAYSCALE_PIXEL_ARRAY,
	width: 4,
	height: 4
}

const INVERT_X_PIXEL_ARRAY = new Uint8Array([
	13,14,15,16,9,10,11,12, 5, 6, 7, 8, 1, 2, 3, 4,
	29,30,31,32,25,26,27,28,21,22,23,24,17,18,19,20,
	45,46,47,48,41,42,43,44,37,38,39,40,33,34,35,36,
	61,62,63,64,57,58,59,60,53,54,55,56,49,50,51,52
])
const INVERT_X_PIXEL_DATA = {
	data: INVERT_X_PIXEL_ARRAY,
	width: 4,
	height: 4
}

const INVERT_Y_PIXEL_ARRAY = new Uint8Array([
	49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,
	33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,
	17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16
])
const INVERT_Y_PIXEL_DATA = {
	data: INVERT_Y_PIXEL_ARRAY,
	width: 4,
	height: 4
}

const TEST_IMAGE_PATH = './test/test_image.png'


//Tests
describe('init()', () => {

	it('Should initialize the file path', () =>{
		let expected_file_path = TEST_IMAGE_PATH

		let sut = new ImageProcessor()
		sut.init(TEST_IMAGE_PATH)

		let actual_file_path = sut.file

		expect(actual_file_path).to.be.equal(expected_file_path)
	})

	it('Should initialize pixel_data from the image', () => {
		//exact pixel data of test image
		let expected_object = LINEAR_PIXEL_DATA 
		let pixel_data = {}

		let sut = new ImageProcessor()

		return sut.init(TEST_IMAGE_PATH).then(() => {
			pixel_data = sut.pixel_data

			expect(pixel_data).to.deep.equal(expected_object)
		})
	})
})

describe('grayscale()', () => {
	it('Should return grayscale pixel data', () => {
		let expected_object = GRAYSCALE_PIXEL_DATA
		let test_object = LINEAR_PIXEL_DATA

		let sut = grayscale(test_object)

		expect(sut).to.deep.equal(expected_object)
	})
})

describe('invertLeftRight()', () => {
	it('Should return pixel data inverted in x direction', () => {
		let expected_object = INVERT_X_PIXEL_DATA
		let test_object = LINEAR_PIXEL_DATA

		let sut = invertLeftRight(test_object)

		expect(sut).to.deep.equal(expected_object)
	})
})

describe('invertUpDown()', () => {
	it('Should return pixel data inverted in y direction', () => {
		let expected_object = INVERT_Y_PIXEL_DATA
		let test_object = LINEAR_PIXEL_DATA

		let sut = invertUpDown(test_object)

		expect(sut).to.deep.equal(expected_object)
	})
})
