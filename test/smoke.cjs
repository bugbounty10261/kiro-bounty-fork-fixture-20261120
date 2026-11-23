'use strict';

const assert = require('node:assert/strict');
const dependency = require('@michaelbugbug/dep-update-demo');

assert.match(dependency.fixtureVersion, /^1\./);
assert.equal(dependency.health(), 'ok');
console.log('DEPENDENCY_SMOKE_OK');
