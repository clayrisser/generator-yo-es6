import YoBasePrompts from 'yo-base-prompts';
import { guessProjectName } from 'project-guess';

export default async function prompting(yo) {
  const yoBasePrompts = new YoBasePrompts(yo);
  let { name } = await yo.optionOrPrompt([
    {
      type: 'input',
      name: 'name',
      message: 'Project Name:',
      default: guessProjectName()
    }
  ]);
  if (!/^generator-/.test(name)) {
    name = `generator-${name}`;
  }
  yoBasePrompts.name = name;
  const destination = await yoBasePrompts.destinationPrompt(name);
  yoBasePrompts.destination = destination;
  const {
    authorEmail,
    authorName,
    authorUrl,
    description,
    githubUsername,
    homepage,
    license,
    repository,
    version
  } = await yoBasePrompts.prompt({
    authorEmail: true,
    authorName: true,
    authorUrl: true,
    description: true,
    githubUsername: true,
    homepage: true,
    license: true,
    repository: true,
    version: true
  });
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
    description,
    destination,
    githubUsername,
    homepage,
    install,
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
