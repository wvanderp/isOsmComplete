# Testing

- Write tests that exercise meaningful behavior in the real implementation, such as parsing, filtering, calculations, or error handling.
- Do not add tests that mock every dependency and only check that configured arguments are forwarded or mocked values are returned. These tests mirror the implementation without validating useful behavior.
- Mock external boundaries when needed, while keeping the logic under test real. For example, mock an HTTP response and exercise the actual CSV parser and validity filtering.
- Skip tests for simple comparison configuration and other low-impact wiring when there is no meaningful behavior to verify.
