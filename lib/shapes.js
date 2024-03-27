// This portion establishes the parent class Shape
class Shape {
    constructor(color) {
        this.color = color;
    }
    // Abstract method I learned about via "https://medium.com/@yuribett/javascript-abstract-method-with-es6-5dbea4b00027" to set getSvg
    getSvg() {
        throw new Error("getSvg must be implemented by all child classes");
    }
}

class Circle extends Shape {
    constructor(color) {
        super(color);
    }
    
    getSvg() {
        return `<circle cx="150" cy="100" r="50" fill="${this.color}" />`;
    }
}

class Square extends Shape {
    constructor(color) {
        super(color);
    }
    
    getSvg() {
        return `<rect x="103" y="53" width="94" height="94" fill="${this.color}" />`;
    }
}

class Triangle extends Shape {
    constructor(color) {
        super(color);
    }
    
    getSvg() {
        return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`;
    }
}

function generateShapes(data) {
    let shape;

    if (data.shape === 'Circle') {
        shape = new Circle(data.shapeColor);
    } else if (data.shape === 'Square') {
        shape = new Square(data.shapeColor);
    } else {
        shape = new Triangle(data.shapeColor);
    }
    return shape.getSvg();
}

module.exports = generateShapes;