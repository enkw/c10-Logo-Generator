const fs = require('fs');
const inquirer = require('inquirer');
const generateShapes = require('./lib/shapes');

function validateColor(input) {
    // Variable for checking if user input matches hexcodes that I learned from https://www.geeksforgeeks.org/javascript-check-if-a-string-is-a-valid-hex-color-representation/#
    const hexColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    // List of basic color names
    const colorNames = [
        "black", "white", "gray", "silver", "maroon", "red", "purple", "fushsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua"
    ];

    // This makes sure user input is either a valid hexcode or on my basic color list pulled from https://www.unm.edu/~tbeach/IT145/color.html#:~:text=HTML%20used%20to%20recognize%2016,those%20are%20red%20and%20white).
    if (hexColor.test(input) || colorNames.includes(input.toLowerCase())) {
        return true;
    }

    return 'Please enter a valid color name (e.g. red, blue) or hexcode (e.g., #ff0000)';
}

const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Please enter a 3 letter name/title for this logo:',
        validate: (input) => {
            if (input.length === 3) {
                return true;
            }
            return 'Please enter exactly 3 characters.'
        }
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'Please enter a basic color name or hexcode for the text:',
        validate: validateColor
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Please select the desired shape for the logo:',
        choices: [
            'Circle',
            'Square',
            'Triangle'
        ]
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Please enter a basic color name or hexcode for the shape:',
        validate: validateColor
      }
];

function init() {
    inquirer.prompt(questions).then((answers) =>
    {
        const svgShape = generateShapes(answers);
        // Found out xlmns was why the SVG wouldn't open as an image in browser thanks to https://developer.mozilla.org/en-US/docs/Web/SVG/Namespaces_Crash_Course
        const svgTemplate = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">${svgShape}
<text x="50%" y="50%" fill="${answers.textColor}" text-anchor="middle" dominant-baseline="middle">${answers.text}</text>
</svg>`;

        fs.writeFile('./examples/logo.svg', svgTemplate, (err) => 
        {
            if (err) {
                console.error('Error creating logo.svg:', err);
            } else {
                console.log('logo.svg has been generated');
            }
        });
    });
}

init();