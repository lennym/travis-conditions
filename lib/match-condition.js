const match = require('minimatch');

function matchCondition (condition) {
  if (condition === 'default') {
    return true;
  } else if (process.env.TRAVIS) {
    if (condition === 'pr') {
      return process.env.TRAVIS_PULL_REQUEST;
    } else if (match(condition, 'branch:*')) {
      const branchname = condition.split(':')[1];
      return process.env.TRAVIS_BRANCH && match(process.env.TRAVIS_BRANCH, branchname);
    } else if (match(condition, 'tag:*')) {
      const tagname = condition.split(':')[1];
      return process.env.TRAVIS_BRANCH && match(process.env.TRAVIS_BRANCH, tagname);
    }
  }
}

module.exports = matchCondition;
