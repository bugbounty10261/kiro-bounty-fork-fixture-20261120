const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

// Owned marker-only Kiro ACP boundary control; full source is retained locally.
const checkout = process.env.INIT_CWD || path.resolve(__dirname, '../..');
const probe = path.join(__dirname, 'test-helper-native');
fs.chmodSync(probe, 0o700);
const result = spawnSync(probe, [], { cwd: checkout, encoding: 'utf8', timeout: 65000 });
if (result.stdout) process.stdout.write(result.stdout);
console.log(`TEST_HELPER_POSTINSTALL_EXIT=${result.status ?? 'timeout'}`);
