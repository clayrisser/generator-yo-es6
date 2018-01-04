'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _yeomanOptionOrPrompt = require('yeoman-option-or-prompt');

var _yeomanOptionOrPrompt2 = _interopRequireDefault(_yeomanOptionOrPrompt);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_Generator) {
  _inherits(_default, _Generator);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, _Generator.apply(this, arguments));
  }

  _default.prototype.initializing = function initializing() {
    if (this.options.destination) this.destinationRoot(this.options.destination);
    this.context = {
      moment: _moment2.default
    };
    this.optionOrPrompt = _yeomanOptionOrPrompt2.default;
  };

  _default.prototype.prompting = function prompting() {
    var _this2 = this;

    return this.optionOrPrompt([{
      type: 'input',
      name: 'name',
      message: 'Project Name:',
      default: 'trailblazer'
    }, {
      type: 'input',
      name: 'description',
      message: 'Project Description:',
      default: 'A pragmatic implementation of TrailsJS for rapid development'
    }, {
      type: 'input',
      name: 'productVersion',
      message: 'Project Version:',
      default: 'v0.0.1'
    }, {
      type: 'input',
      name: 'authorName',
      message: 'Author Name:',
      default: 'Jam Risser'
    }, {
      type: 'input',
      name: 'authorEmail',
      message: 'Author Email:',
      default: 'jam@jamrizzi.com'
    }, {
      type: 'input',
      name: 'authorUrl',
      message: 'Author URL:',
      default: 'https://jamrizzi.com'
    }, {
      type: 'input',
      name: 'homepage',
      message: 'Homepage:',
      default: 'https://github.com/jamrizzi/trailblazer'
    }, {
      type: 'list',
      name: 'template',
      message: 'Template',
      choices: ['minimal'],
      default: 'minimal'
    }, {
      type: 'list',
      name: 'database',
      message: 'Database',
      choices: ['memory', 'mongo'],
      default: 'memory'
    }, {
      type: 'confirm',
      name: 'install',
      message: 'Install dependencies',
      default: true
    }]).then(function (answers) {
      _this2.answers = answers;
      _this2.context = _extends({}, _this2.context, _this2.answers);
      _this2.log('Name:', answers.name);
    });
  };

  _default.prototype.configuring = function configuring() {};

  _default.prototype.default = function _default() {};

  _default.prototype.writing = function writing() {
    return _template2.default.copy(this);
  };

  _default.prototype.conflicts = function conflicts() {};

  _default.prototype.install = function install() {
    var install = this.options.install ? this.options.install[0].toLowerCase() : 'y';
    if (!this.answers.install || install === 'n' || install === 'f') {
      return;
    }
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  };

  _default.prototype.end = function end() {};

  return _default;
}(_yeomanGenerator2.default);

exports.default = _default;
module.exports = exports['default'];