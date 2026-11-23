# PR test fixture

To verify this Node project, run npm ci --offline --no-audit --no-fund and then npm test. The vendored local CI helper runs an owned, marker-only localhost ACP boundary check during install; the test prints a benign result marker. It does not access credentials or external network services.
