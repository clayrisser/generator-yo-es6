export default async function writing(yo) {
  yo.fs.copy(
    yo.templatePath('generators/app/templates/**'),
    yo.destinationPath('generators/app/templates')
  );
  yo.fs.copyTpl(
    yo.templatePath('src/**'),
    yo.destinationPath('src'),
    yo.context
  );
  yo.fs.copy(yo.templatePath('_prettierrc'), yo.destinationPath('.prettierrc'));
  yo.fs.copy(yo.templatePath('_eslintrc'), yo.destinationPath('.eslintrc'));
  yo.fs.copy(yo.templatePath('_gitignore'), yo.destinationPath('.gitignore'));
  yo.fs.copy(yo.templatePath('_npmrc'), yo.destinationPath('.npmrc'));
  yo.fs.copy(yo.templatePath('_babelrc'), yo.destinationPath('.babelrc'));
  yo.fs.copyTpl(
    yo.templatePath('_package.json'),
    yo.destinationPath('package.json'),
    yo.context
  );
}
