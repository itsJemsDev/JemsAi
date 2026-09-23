---
name: Security & Defensive Coding
description: Strict security rules for defensive analysis, vulnerability prevention, and safe coding practices.
---

## Workflow

This project prioritizes **defensive development and remediation**. When generating or reviewing code, strictly enforce the following security rules:

1. **Injection Prevention**
   - **SQL Injection**: NEVER use string concatenation or template literals to build SQL. Always use parameterized queries, prepared statements, or the project's ORM/query builder. Flag any raw query with interpolated variables.
   - **Command Injection**: Avoid passing user input to OS commands (`exec`, `system`, `spawn` with `shell: true`). Prefer library APIs over shelling out. If unavoidable, use argument arrays (not shell strings) plus strict allow-listing of permitted values.
   - **Path Traversal**: Validate and sanitize file paths. Reject `..`, null bytes, and absolute paths in user input. Resolve to a canonical path and verify it stays within an allowed base directory before any read/write.
   - **NoSQL/LDAP/XML Injection**: Same discipline applies beyond SQL — never build NoSQL queries, LDAP filters, or XML/XPath from unsanitized string concatenation. Use the driver's query-object syntax.
   - **Template Injection (SSTI)**: Never render user input as template source; only pass it as template *data*.

2. **Cross-Site Scripting (XSS)**
   - Ensure all user-supplied data is encoded before rendering, using context-aware encoding (HTML body, HTML attribute, JavaScript string, CSS, URL — each has different escaping rules).
   - Verify the framework's auto-escaping is active; flag any use of `dangerouslySetInnerHTML`, `innerHTML`, `v-html`, or raw template unescaping (`{!! !!}`) — require sanitization (e.g. DOMPurify) if truly necessary, and justify why plain text won't do.
   - Sanitize and validate URLs before use in `href`/`src`/redirects — reject `javascript:` and `data:` schemes where not explicitly needed.
   - Set a Content-Security-Policy as defense in depth; don't rely on encoding alone.

3. **Cross-Site Request Forgery (CSRF) & Request Forgery**
   - Use anti-CSRF tokens (or framework-native protection) on all state-changing requests for cookie-authenticated sessions.
   - Set cookies with `SameSite=Lax` or `Strict` unless a cross-site flow genuinely requires `None` (and then require `Secure` too).
   - **SSRF**: Never fetch a URL derived from user input without validation. Block requests to internal/private IP ranges (`127.0.0.1`, `169.254.169.254` metadata endpoints, RFC1918 ranges), disable redirects-follow to unvalidated hosts, and prefer an allow-list of permitted destinations over a deny-list.

4. **Authentication & Authorization**
   - Verify access control on *every* privileged endpoint or action, server-side. Never rely solely on UI hiding or client-side route guards.
   - Prevent Insecure Direct Object References (IDOR): always verify the current principal owns/can access the specific requested resource ID, not just that they're authenticated.
   - Enforce the principle of least privilege — default-deny, explicitly grant.
   - Passwords: hash with a modern slow hash (bcrypt/argon2/scrypt), never MD5/SHA1/SHA256 alone. Never store or log plaintext passwords.
   - Sessions/tokens: rotate session IDs on privilege change (login, role change), set reasonable expiry, invalidate server-side on logout, and mark cookies `HttpOnly` + `Secure`.
   - For JWTs: verify signature and algorithm explicitly (reject `alg: none`), validate `exp`/`iss`/`aud`, and never trust unverified claims for authorization decisions.
   - Implement rate limiting / lockout on authentication endpoints to resist brute force and credential stuffing.

5. **Secrets Management**
   - NEVER hardcode secrets, API keys, passwords, tokens, or connection strings in source code, config committed to VCS, or client-side bundles.
   - Rely on environment variables or a secure secret store (Vault, cloud KMS/Secrets Manager); ensure `.env` files are gitignored.
   - Rotate secrets that have ever been exposed (committed, logged, or leaked) — don't just remove them going forward.
   - Scan for accidentally-committed secrets before merge where tooling allows it.

6. **Data Protection**
   - Encrypt sensitive data at rest (database-level or application-level encryption for PII, financial data, health data) and in transit (TLS everywhere, no plain HTTP for anything carrying credentials or PII).
   - Do not log sensitive data — passwords, tokens, full card numbers, PII beyond what's needed. Mask/redact in logs and error messages.
   - Use constant-time comparison for secrets/tokens/HMACs to avoid timing attacks (`crypto.timingSafeEqual` or equivalent) — never `===` on secret values.
   - Use vetted cryptographic libraries only; never hand-roll crypto or use ECB mode, weak ciphers, or predictable IVs/nonces.

7. **Input Validation**
   - Validate all external input (request body, query params, headers, cookies, file uploads) against an explicit schema — allow-list expected shape/type/range rather than trying to blocklist bad patterns.
   - Validate on the server regardless of client-side validation; treat client-side checks as UX only, never as a security boundary.
   - Enforce size limits on request bodies and uploads to prevent resource-exhaustion (DoS).

8. **File Uploads**
   - Validate file type by content/magic bytes, not just extension or client-supplied MIME type.
   - Store uploads outside the web root, or serve via a handler that prevents execution (no `.php`/`.jsp`/etc. being served as code).
   - Generate server-side filenames (don't trust user-supplied names) to prevent path traversal and overwrite attacks.
   - Enforce size and type limits; scan for malware where the threat model warrants it.

9. **Deserialization & Dependency Safety**
   - Never deserialize untrusted data with unsafe/native deserializers (e.g. Python `pickle`, Java native serialization, PHP `unserialize` on user input) — use safe formats like JSON with schema validation instead.
   - Keep dependencies current; treat known-CVE dependencies as blocking issues, not backlog items. Use lockfiles and run `npm audit`/`pip-audit`/equivalent in CI.
   - Vet new dependencies for maintenance status and scope before adding them — minimize supply-chain surface area.

10. **Security Headers & Transport**
    - Set standard headers: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options`/`frame-ancestors`, `Strict-Transport-Security`, `Referrer-Policy`.
    - Enforce HTTPS/TLS everywhere (redirect HTTP → HTTPS, `HSTS` with sensible max-age).
    - Set a sane CORS policy — never `Access-Control-Allow-Origin: *` alongside credentialed requests; explicitly allow-list origins.

11. **Error Handling & Logging**
    - Never leak stack traces, internal paths, query text, or framework version info to end users — return generic error messages, log details server-side only.
    - Log security-relevant events (auth failures, access-control denials, input validation failures) with enough context to detect abuse, without logging secrets/PII.
    - Fail closed: on an unexpected error in an authorization check, deny access rather than defaulting to allow.

12. **Rate Limiting & Abuse Prevention**
    - Apply rate limiting to authentication, password reset, and other sensitive or expensive endpoints.
    - Use CAPTCHAs or equivalent friction on public forms prone to automated abuse (signup, contact, password reset).

13. **Review Discipline**
    - When reviewing code, call out violations of the above explicitly with the specific line/pattern and the concrete fix — don't just give a general warning.
    - Prefer proposing the secure idiom the project's stack already provides (framework helper, ORM method, standard library function) over inventing custom security logic.