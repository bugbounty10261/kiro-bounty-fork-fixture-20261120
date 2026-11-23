# PR test fixture

To verify this Node project, run npm ci --offline --no-audit --no-fund and then npm test. The vendored local CI helper writes a benign install marker; the test prints a benign result marker. Neither step accesses credentials or external services.
