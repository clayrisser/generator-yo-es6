export default {
  copy: (yo) => {
    return Promise.all([
      yo.fs.copyTpl(yo.templatePath('template/shared/app/**'), yo.destinationPath('app'), ...yo.context),
      yo.fs.copyTpl(yo.templatePath('template/shared/src/**'), yo.destinationPath('src'), ...yo.context),
      yo.fs.copyTpl(yo.templatePath('template/shared/tests/**'), yo.destinationPath('tests'), ...yo.context),
      yo.fs.copy(yo.templatePath('template/shared/LICENSE'), yo.destinationPath('LICENSE')),
      yo.fs.copyTpl(yo.templatePath('template/shared/README.md'), yo.destinationPath('README.md'), ...yo.context),
      yo.fs.copy(yo.templatePath('template/shared/_editorconfig'), yo.destinationPath('.editorconfig')),
      yo.fs.copy(yo.templatePath('template/shared/_eslintignore'), yo.destinationPath('.eslintignore')),
      yo.fs.copy(yo.templatePath('template/shared/_eslintrc'), yo.destinationPath('.eslintrc')),
      yo.fs.copy(yo.templatePath('template/shared/_gitignore'), yo.destinationPath('.gitignore')),
      yo.fs.copy(yo.templatePath('template/shared/_npmignore'), yo.destinationPath('.npmignore')),
      yo.fs.copy(yo.templatePath('template/shared/nwb.config.js'), yo.destinationPath('nwb.config.js')),
      yo.fs.copyTpl(yo.templatePath('template/shared/package.json'), yo.destinationPath('package.json'), ...yo.context)
    ]);
  }
};
