import YoBasePrompts from 'yo-base-prompts';
import { guessName } from 'project-guess';

export default async function prompting(yo) {
  const { prompt, destinationPrompt } = new YoBasePrompts(yo);
  let { name } = await this.optionOrPrompt([
    {
      type: 'input',
      name: 'name',
      message: 'Project Name:',
      default: guessName()
    }
  ]);
  if (!/^generator-/.test(name)) {
    name = `generator-${name}`;
  }
  const { destination } = await destinationPrompt(name);
  const {
    description,
    version,
    license,
    authorName,
    authorEmail,
    githubUsername,
    authorUrl,
    homepage,
    repository
  } = await prompt({
    description: true,
    version: true,
    license: true,
    authorName: true,
    authorEmail: true,
    githubUsername: true,
    authorUrl: true,
    homepage: true,
    repository: true
  });
  const features = [];
  for (;;) {
    const { feature } = await yo.prompt([
      {
        type: 'input',
        name: 'feature',
        message: 'Feature:'
      }
    ]);
    if (feature === '') break;
    features.push(feature);
  }
  const { installation, demo } = await yo.prompt([
    {
      type: 'input',
      name: 'installation',
      message: 'Installation command:'
    },
    {
      type: 'input',
      name: 'demo',
      message: 'Demo URL:'
    }
  ]);
  const dependencies = [];
  for (;;) {
    const { dependencyName } = await yo.prompt([
      {
        type: 'input',
        name: 'dependencyName',
        message: 'Dependency:'
      }
    ]);
    if (dependencyName === '') break;
    const { dependencyUrl } = await yo.prompt([
      {
        type: 'input',
        name: 'dependencyUrl',
        message: 'Dependency URL:',
        default: 'https://example.com'
      }
    ]);
    dependencies.push({
      name: dependencyName,
      url: dependencyUrl
    });
  }
  const { install } = await yo.prompt([
    {
      type: 'confirm',
      name: 'install',
      message: 'Install dependencies',
      default: true
    }
  ]);
  yo.answers = {
    authorEmail,
    authorName,
    authorUrl,
    demo,
    dependencies,
    description,
    destination,
    features,
    githubUsername,
    homepage,
    install,
    installation,
    license,
    name,
    repository,
    version
  };
  if (
    (await yo.optionOrPrompt([
      {
        type: 'confirm',
        name: 'generatorGithubProject',
        message: 'Generator GitHub Project:',
        default: true
      }
    ])).generatorGithubProject
  ) {
    yo.composeWith(require.resolve('generator-github-project'), {
      ...yo.answers,
      template: 'minimal'
    });
  }
  yo.context = { ...yo.context, ...yo.answers };
}
