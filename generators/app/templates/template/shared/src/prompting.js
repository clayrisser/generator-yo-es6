import YoBasePrompts from 'yo-base-prompts';

export default async function prompting(yo) {
  const yoBasePrompts = new YoBasePrompts(yo);
  const {
    authorEmail,
    authorName,
    authorUrl,
    description,
    destination,
    githubUsername,
    homepage,
    license,
    name,
    repository,
    version
  } = await yoBasePrompts.prompt({
    authorEmail: true,
    authorName: true,
    authorUrl: true,
    description: true,
    destination: true,
    githubUsername: true,
    homepage: true,
    license: true,
    name: true,
    repository: true,
    version: true
  });
  const keywords = [];
  for (;;) {
    const { keyword } = await yo.prompt([
      {
        type: 'input',
        name: 'keyword',
        message: 'Keyword:'
      }
    ]);
    if (keyword === '') break;
    keywords.push(keyword);
  }
  const files = [];
  for (;;) {
    const { file } = await yo.prompt([
      {
        type: 'input',
        name: 'file',
        message: 'File:'
      }
    ]);
    if (file === '') break;
    files.push(file);
  }
  const { install, main, bin } = await yo.optionOrPrompt([
    {
      type: 'input',
      name: 'main',
      message: 'Main:'
    },
    {
      type: 'input',
      name: 'bin',
      message: 'Bin:'
    },
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
    bin,
    description,
    destination,
    files,
    githubUsername,
    homepage,
    install,
    keywords,
    license,
    main,
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
