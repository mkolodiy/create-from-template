const fs = require('fs');
const path = require('path');
const readline = require('readline');
const util = require('util');

const rl = readline.createInterface({
  input: process.stdin, //or fileStream
  output: process.stdout,
});
rl.question[util.promisify.custom] = (question) => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};
const question = util.promisify(rl.question).bind(rl);

async function main() {
  const componentNameArg = process.argv.find((arg) => arg.includes('--name'));
  const componentPathArg = process.argv.find((arg) => arg.includes('--path'));
  let componentName = componentNameArg && componentNameArg.split('=')[1];
  let componentPath = componentPathArg && componentPathArg.split('=')[1];

  if (!componentName) {
    componentName = await askQuestion('What is the name of the component?');
  }

  if (!componentPath) {
    componentPath = await askQuestion('What is the path of the component?');
  }

  const sourceFolderPath = path.join(__dirname, 'template');
  const destFolderPath = path.join('src', componentPath);

  try {
    fs.mkdirSync(path.join(__dirname, destFolderPath), { recursive: true });
    const sourceFiles = fs.readdirSync(sourceFolderPath);

    sourceFiles.forEach((sourceFileName) => {
      const sourceFilePath = path.join(sourceFolderPath, sourceFileName);
      const sourceFileContent = fs.readFileSync(sourceFilePath, 'utf8');
      const destFileName = sourceFileName.replace(
        /COMPONENT_NAME/g,
        componentName
      );
      const destFilePath = path.join(destFolderPath, destFileName);
      const destFileContent = sourceFileContent
        .replace(/COMPONENT_NAME/g, componentName)
        .replace(/COMPONENT_PATH/g, componentPath);
      fs.writeFileSync(destFilePath, destFileContent);
    });

    rl.close();
  } catch (err) {
    console.log(err);
  }
}

main();

async function askQuestion(questionPhrase) {
  try {
    const answer = await question(`${questionPhrase} `);
    return answer;
  } catch (err) {
    console.error('Question rejected', err);
  }
}
