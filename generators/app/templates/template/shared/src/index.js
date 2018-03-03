import 'babel-polyfill';
import Generator from 'yeoman-generator';
import moment from 'moment';
import optionOrPrompt from 'yeoman-option-or-prompt';
import path from 'path';
import {
  copy,
  guessEmail,
  guessUsername,
  guessName,
  guessAuthorName,
  isEmpty
} from './lib';

module.exports = class extends Generator {
  initializing() {
    if (this.options.destination)
      this.destinationRoot(this.options.destination);
    this.context = {
      moment
    };
    this.optionOrPrompt = optionOrPrompt;
  }

  async prompting() {
    const { name } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project Name:',
        default: guessName()
      }
    ]);
    const { description, version, license } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'description',
        message: 'Project Description:',
        default: `The awesome ${name} project`
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version:',
        default: '0.0.1'
      },
      {
        type: 'input',
        name: 'license',
        message: 'License:',
        default: 'MIT'
      }
    ]);
    const { authorName, authorEmail } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'authorName',
        message: 'Author Name:',
        default: guessAuthorName()
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author Email:',
        default: guessEmail()
      }
    ]);
    const { githubUsername } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'githubUsername',
        message: 'GitHub Username:',
        default: guessUsername(authorEmail)
      }
    ]);
    const { authorUrl } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'authorUrl',
        message: 'Author URL:',
        default: `https://${githubUsername}.com`
      }
    ]);
    const { repository } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'repository',
        message: 'Repository:',
        default: `https://github.com/${githubUsername}/${name}`
      }
    ]);
    const { homepage, template, install } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'homepage',
        message: 'Homepage:',
        default: repository
      },
      {
        type: 'list',
        name: 'template',
        message: 'Template',
        choices: ['minimal'],
        default: 'minimal'
      },
      {
        type: 'confirm',
        name: 'install',
        message: 'Install dependencies',
        default: true
      }
    ]);
    this.answers = {
      authorEmail,
      authorName,
      authorUrl,
      description,
      githubUsername,
      homepage,
      install,
      license,
      name,
      repository,
      template,
      version
    };
    this.context = { ...this.context, ...this.answers };
  }

  configuring() {
    if (!this.options.destination && !isEmpty()) {
      this.destinationRoot(path.resolve(this.answers.name));
    }
  }

  default() {}

  writing() {
    return copy(this);
  }

  conflicts() {}

  install() {
    const install = this.options.install
      ? this.options.install[0].toLowerCase()
      : 'y';
    if (!this.answers.install || install === 'n' || install === 'f')
      return false;
    return this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }

  end() {}
};
