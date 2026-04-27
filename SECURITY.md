# Security Policy

## Supported Versions

Security fixes are provided for the latest patch release of the supported
release lines listed below.

We generally do not backport security fixes to older patch or minor releases
within the same major release line. For example, if a vulnerability affects
multiple 8.x releases, the fix will normally be released as a new latest 8.x
patch release. Users on older 8.x versions should upgrade to the latest 8.x
release containing the fix.

| Release line | Supported |
| ------------ | --------- |
| 8.x          | ✅        |
| 7.5.x        | ✅        |
| < 7.5        | ❌        |

## Reporting a Vulnerability

Please do not report security vulnerabilities through public GitHub issues.

To report a vulnerability, use GitHub's private vulnerability reporting feature
from the repository's Security tab.

When reporting a vulnerability, please include as much detail as possible,
including:

- a description of the issue and its potential impact
- steps to reproduce the issue
- affected versions, if known
- any suggested mitigation or patch, if available

We will review vulnerability reports privately. If the report is accepted, we
will work on a fix and coordinate disclosure through a GitHub Security Advisory
where appropriate. If the report is declined, we will explain why it is not
considered a security issue.
