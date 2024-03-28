const generateShapes = require('./shapes.js');
const { Circle, Square, Triangle } = require('./shapes.js');

describe('generateShapes', () => {
    
    it('should return a circle that is blue', () => {
        const shape = new Circle("blue");
        expect(shape.render()).toEqual('<circle cx="150" cy="100" r="50" fill="blue" />');
    });
    it('should return a square that is blue', () => {
        const shape = new Square("blue");
        expect(shape.render()).toEqual('<rect x="103" y="53" width="94" height="94" fill="blue" />');
    });
    it('should return a triangle that is blue', () => {
        const shape = new Triangle("blue");
        expect(shape.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');
    });
});