const prettierCmd = 'prettier --find-config-path --cache --cache-strategy content --write';
const stylelintCmd = 'stylelint --aei --cache --cache-strategy content --fix';
const eslintCmd = 'eslint --max-warnings=0 --cache --cache-strategy content --fix';

module.exports = {
  '**/*.js': [prettierCmd, eslintCmd, 'git add'],
  '**/*.html': [prettierCmd, stylelintCmd, eslintCmd, 'git add'],
  '**/*.css': [prettierCmd, stylelintCmd, 'git add'],
  '**/*.{md,json}': [prettierCmd, 'git add'],
};
