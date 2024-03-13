#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configFilePath = 'inline.config.json';

// Function to read a file and return its content
function readFileContent(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function replaceReferences(text, inputFileDir) {
  const referenceRegex = /(?:\/\*\s*{{\s*(.*?)\s*}}\s*\*\/)|(?:<!--\s*{{\s*(.*?)\s*}}\s*-->)/g;

  return text.replace(referenceRegex, (match, filePath1, filePath2) => {
    const filePath = filePath1 || filePath2;
    const referencedFilePath = path.join(inputFileDir, filePath);
    const referencedContent = readFileContent(referencedFilePath);
    return replaceReferences(
      referencedContent,
      path.dirname(referencedFilePath)
    );
  });
}

// Read config file
fs.readFile(configFilePath, 'utf8', (err, configData) => {
  if (err) {
    console.error('Error reading config file:', err);
    return;
  }

  try {
    const config = JSON.parse(configData);
    const entries = config.entries;

    entries.forEach(entry => {
      const inputFile = entry[0];
      const outputFile = entry[1];

      console.log(`*  Bundling ${inputFile}...`);

      // Read input file, replace references, and write to output file
      fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading input file:', err);
          return;
        }

        const inputFileDir = path.dirname(inputFile);

        const inputFileExt = path.extname(inputFile)
        const replacedContent = replaceReferences(data, inputFileDir, inputFileExt);

        fs.writeFile(outputFile, replacedContent, 'utf8', (err) => {
          if (err) {
            console.error('Error writing to output file:', err);
            return;
          }
          console.log('✔️  Done, output file generated successfully:', outputFile);
        });
      });
    });
  } catch (error) {
    console.error('Error parsing config JSON:', error);
  }
});
