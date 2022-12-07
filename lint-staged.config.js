const prettierCmd = 'prettier --find-config-path --cache --cache-strategy content --write';
const stylelintCmd = 'stylelint --aei --cache --cache-strategy content';
const eslintCmd = 'eslint --max-warnings=0 --cache --cache-strategy content';

module.exports = {
  '**/*.js': [prettierCmd, eslintCmd],
  '**/*.html': [prettierCmd, stylelintCmd, eslintCmd],
  '**/*.css': [prettierCmd, stylelintCmd, eslintCmd],
  '**/*.{md,json}': [prettierCmd],
};
