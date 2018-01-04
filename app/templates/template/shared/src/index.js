import Generator from 'yeoman-generator';
import moment from 'moment';
import optionOrPrompt from 'yeoman-option-or-prompt';
import template from './template';

export default class extends Generator {
  initializing() {
    if (this.options.destination) this.destinationRoot(this.options.destination);
    this.context = {
      moment
    };
    this.optionOrPrompt = optionOrPrompt;
  }

  prompting() {
    return this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project Name:',
        default: 'yohoho'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project Description:',
        default: 'A pragmatic implementation of TrailsJS for rapid development'
      },
      {
        type: 'input',
        name: 'productVersion',
        message: 'Project Version:',
        default: 'v0.0.1'
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author Name:',
        default: 'Jam Risser'
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author Email:',
        default: 'jam@jamrizzi.com'
      },
      {
        type: 'input',
        name: 'authorUrl',
        message: 'Author URL:',
        default: 'https://jamrizzi.com'
      },
      {
        type: 'input',
        name: 'homepage',
        message: 'Homepage:',
        default: 'https://github.com/jamrizzi/generator-yohoho'
      },
      {
        type: 'list',
        name: 'template',
        message: 'Template',
        choices: ['minimal'],
        default: 'minimal'
      },
      {
        type: 'list',
        name: 'database',
        message: 'Database',
        choices: ['memory', 'mongo'],
        default: 'memory'
      },
      {
        type: 'confirm',
        name: 'install',
        message: 'Install dependencies',
        default: true
      }
    ]).then((answers) => {
      this.answers = answers;
      this.context = { ...this.context, ...this.answers };
      this.log('Name:', answers.name);
    });
  }

  configuring() {}

  default() {}

  writing() {
    return template.copy(this);
  }

  conflicts() {}

  install() {
    const install = this.options.install ? this.options.install[0].toLowerCase() : 'y';
    if (!this.answers.install || install === 'n' || install === 'f') {
      return;
    }
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }

  end() {}
}
