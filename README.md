# travis-conditions

Allows conditional build commands to be run in Travis CI dependent on the branch or state of the build.

## Usage

Install `travis-conditions` as a dev dependency of your project.

```
npm install --save-dev travis-conditions
```

Create a script in your package.json `scripts` section to call `travis-conditions`

```json
{
  ...
  "scripts": {
    "travis-conditions": "travis-conditions"
  }
  ...
}
```

Set your travis `script` parameter to the npm script created above. Add conditions to a `conditions` parameter.

```yaml
language: node_js
node_js:
  - "4"
  - "6"
script: npm run travis-conditions
conditions:
  branch:master: echo "building master" && npm test
```

## Conditions

The first condition that matches will be executed. If no condition is matched, then `npm test` will run by default (as per standard travis configuration).

* `pr` - will match only for pull request builds
* `branch:<name>` - will match only for branches which match `<name>`, which can include `*` as wildcards
* `tag:<name>` - will match only for tags which match `<name>`, which can include `*` as wildcards
* `default` - will always match
