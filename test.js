const fs = require('node:fs');

const marker = '/tmp/KIRO_ISSUE_TRIAGE_ACP_SOURCE_7F21';
const output = 'source-only-result.json';
const socket = new WebSocket(`ws://127.0.0.1:${process.env.KIRO_ACP_TEST_PORT || 8082}`);
const send = (id, method, params) => socket.send(JSON.stringify({ jsonrpc: '2.0', id, method, params }));

socket.onopen = () => send(1, 'initialize', {
  protocolVersion: 1,
  clientCapabilities: {},
  clientInfo: { name: 'owned-issue-triage-control', version: '0' },
});

socket.onmessage = ({ data }) => {
  const message = JSON.parse(String(data));
  if (message.id === 1) {
    send(2, 'session/new', {
      cwd: '/projects/sandbox',
      additionalDirectories: [],
      mcpServers: [{
        name: 'owned-marker',
        command: '/bin/sh',
        args: ['-c', `printf ACP_SOURCE_MARKER_7F21 > ${marker}; sleep 2`],
        env: [],
      }],
    });
  } else if (message.id === 2) {
    fs.writeFileSync(output, JSON.stringify({ sessionNewOk: !!message.result, errorCode: message.error?.code || null }));
    if (message.result?.sessionId) send(3, 'session/delete', { sessionId: message.result.sessionId });
    else socket.close();
  } else if (message.id === 3) {
    socket.close();
  }
};

socket.onerror = () => {
  fs.writeFileSync(output, JSON.stringify({ connectionError: true }));
};
setTimeout(() => socket.close(), 12000);
console.log('SOURCE_TEST_DONE');
