import emptyDir from 'empty-dir';
import gitUserEmail from 'git-user-email';
import gitUserName from 'git-user-name';
import fs from 'fs-extra-promise';

export function isEmpty() {
  return emptyDir.sync(process.cwd());
}

export function guessEmail() {
  return gitUserEmail() || 'email@example.com';
}

export function guessUsername(email) {
  const matches = (email || guessEmail()).match(/^[^@]+/g);
  if (matches.length > 0) return matches[0];
  return 'some-username';
}

export function guessName() {
  const matches = process.cwd().match(/[^\/]+$/g);
  if (isEmpty() && matches.length > 0) return matches[0];
  return 'some-name';
}

export function guessAuthorName() {
  return gitUserName() || 'Some Name';
}

export function copy(yo) {
  return Promise.all([
    yo.fs.copyTpl(
      yo.templatePath('template/shared/_package.json'),
      yo.destinationPath('package.json'),
      { ...yo.context }
    )
  ]);
}
