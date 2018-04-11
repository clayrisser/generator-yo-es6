import fs from 'fs-extra';

export default async function writing(yo) {
  fs.mkdirsSync(
    yo.destinationPath('generators/app/templates/template/minimal')
  );
  yo.fs.copy(
    yo.templatePath(
      'template/shared/generators/app/templates/template/shared/**'
    ),
    yo.destinationPath('generators/app/templates/template/shared')
  );
  yo.fs.copyTpl(
    yo.templatePath('template/shared/src/**'),
    yo.destinationPath('src'),
    yo.context
  );
  yo.fs.copy(
    yo.templatePath('template/shared/_prettierrc'),
    yo.destinationPath('.prettierrc')
  );
  yo.fs.copy(
    yo.templatePath('template/shared/_eslintrc'),
    yo.destinationPath('.eslintrc')
  );
  yo.fs.copy(
    yo.templatePath('template/shared/_gitignore'),
    yo.destinationPath('.gitignore')
  );
  yo.fs.copyTpl(
    yo.templatePath('template/shared/_package.json'),
    yo.destinationPath('package.json'),
    yo.context
  );
}
