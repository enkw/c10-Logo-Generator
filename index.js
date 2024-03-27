const fs = require('fs');
const inquirer = require('inquirer');
const jest = require('jest');
const generateShapes = require('./lib/shapes');

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
        message: 'Please enter a basic color name or hexcode for the text:'
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
        message: 'Please enter a basic color name or hexcode for the shape:'
      }
];

function init() {
    inquirer.prompt(questions).then((answers) =>
    {
        const svgShape = generateShapes(answers);
        const svgTemplate = `<svg width="300" height="200">${svgShape}
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