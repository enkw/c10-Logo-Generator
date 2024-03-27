function generateShapes(data) {
    if (data.shape === 'Circle') {
        return`<circle cx="200" cy="100" r="50" fill="${data.shapeColor}" />`;
    } else if (data.shape === 'Square') {
        return`<rect x="150" y="18" width="94" height="94" fill="${data.shapeColor}" />`;
    } return`<polygon points="150, 18 244, 182 56, 182" fill="${data.shapeColor}" />`;
}

module.exports = generateShapes;