const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    }, 
    {
      type: 'input',
      name: 'description',
      message: 'Enter a description of your app.',
    },
    {
      type: 'input',
      name: 'instalation',
      message: 'Enter your installation instructions.',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Enter usage information.',
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Enter contribution guidelines.',
    },
    {
        type: 'input',
        name: 'test',
        message: 'Enter your test instructions',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose your license.',
        choices: ['MIT License', 'GNU General Public License v3.0', 'Apache License 2.0', 'Mozilla Public License 2.0', 'The Unlicense']
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username.',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address.',
      },
  ]);
};
function getBadge(license) {
    let badge;
    switch(license) {
        case 'MIT License':
            badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
            break;
        case 'GNU General Public License v3.0':
            badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
            break;
        case 'Apache License 2.0':
            badge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
            break;
        case 'Mozilla Public License 2.0':
            badge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
            break;
        case 'The Unlicense':
            badge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)';
            break;
    }
    return badge;
}

const generateREADME = (answers) =>
  `# ${answers.title}

  ${getBadge(answers.license)}
  
  ## Description
  ---
  ${answers.description}
  
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Questions](#questions)
  
  ## Installation
  ${answers.instalation}
  
  ## Usage
  ${answers.usage}
  
  ## License
  This application is covered under the ${answers.license} license.
  
  ---
  ## Contributing
  ${answers.contributing}
  
  ## Tests
  ${answers.test}
  
  ## Questions
  My Git hub profile id [here](https://github.com/${answers.github}).
  I can be reached at [mailto](mailto:${answers.email}) for further questions.`;

// Bonus using writeFileAsync as a promise
const init = () => {
  promptUser()
    .then((answers) => writeFileAsync('output/README.md', generateREADME(answers)))
    .then(() => console.log('Successfully wrote to README.md'))
    .catch((err) => console.error(err));
};

init();
