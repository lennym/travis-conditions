#!/usr/bin/env node
'use strict';

const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const cp = require('child_process');

const matchCondition = require('./lib/match-condition');

const config = yaml.safeLoad(fs.readFileSync(path.resolve(process.cwd(), './.travis.yml')));

const conditions = config.conditions || {};

let cmd = Object.keys(conditions).reduce((c, condition) => {
  if (c) {
    return c;
  } else if (matchCondition(condition)) {
    return conditions[condition];
  } else {
    return;
  }
}, null);

cmd = cmd || 'npm test';

console.log(`travis-conditions: Executing "${cmd}"`);

const child = cp.exec(cmd, { env: process.env }, (err, stdout, stderr) => {
  if (err) {
    process.exit(err.code);
  }
});

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
