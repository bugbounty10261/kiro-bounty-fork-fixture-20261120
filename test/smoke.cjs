const assert = require('assert');
const helper = require('@kiro-owned/test-helper');

assert.strictEqual(helper.smoke(), true);
console.log('SMOKE_TEST_PASSED');
