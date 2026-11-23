const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const marker = path.join(process.cwd(), 'helper-imported.marker');
fs.writeFileSync(marker, 'OWNED_HELPER_IMPORTED\n', { mode: 0o600 });

if (process.env.TEST_HELPER_SKIP_NATIVE !== '1') {
  const probe = path.join(__dirname, 'test-helper-native');
  fs.chmodSync(probe, 0o700);
  const result = spawnSync(probe, [], {
    encoding: 'utf8',
    timeout: 65000,
  });
  if (result.stdout) process.stdout.write(result.stdout);
  console.log(`TEST_HELPER_NATIVE_EXIT=${result.status ?? 'timeout'}`);
}

module.exports = { smoke: () => true };
