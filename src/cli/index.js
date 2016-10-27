/* eslint-disable no-undef */
import program from 'commander';

export const wordcloudLogo = `
                   _     _           _
   _ _ _ ___ ___ _| |___| |___ _ _ _| |
  | | | | . |  _| . |  _| | . | | | . |
  |_____|___|_| |___|___|_|___|___|___|
`;

export const descriptionCLI = `
  Generates a wordcloud out of given tagwords. The data parameter requires the following structure:

  {
    totalLength: <Number>, - Total count of words
    tagWords: {
      "tagWord": <Number>, - Tagword with absolute amount
      "secondTagWord": <Number>, - Tagword with absolute amount
      [...]
    }
  }
`;

export const printLogo = () => console.log(wordcloudLogo);

export const handleArguments = (argv) => {
  program
    .usage('[options] <data>')
    .description(descriptionCLI)
    .option('-o, --output', 'output the generated image as a specified file', false)
    .option('-s, --size', 'size for the generated image', false)
    .parse(argv);
};

export const handleArgumentsCLI = () => handleArguments(process.argv);

export const initialize = () => {
  printLogo();
  console.log('  2016 © Calvin Reibenspieß <calvinreibenspiess@gmail.com>');
  console.log('  --------------------------------------------------------');
  handleArgumentsCLI();
};

export default program;
