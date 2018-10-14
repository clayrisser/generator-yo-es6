export default async function writing(yo) {
  yo.fs.copyTpl(
    yo.templatePath('_package.json'),
    yo.destinationPath('package.json'),
    yo.context
  );
}
