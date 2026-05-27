# Security Policy

## Reporting a vulnerability

Don't open a public GitHub issue.

Email <security@octane.team> with:

- A description of the vulnerability
- Steps to reproduce (or a proof of concept)
- The version / commit SHA you tested
- Your assessment of impact

We'll acknowledge within 72 hours and aim to ship a fix or mitigation within 14 days for high-severity issues.

## Scope

In scope:

- The hosted openfolio app
- This repository's source code
- The GitHub parser (`lib/parsers/`)

Out of scope:

- Reports that require an attacker to already control the victim's GitHub account
- DoS via the public GitHub API (that's GitHub's rate limiter doing its job)
- Issues in dependencies — file those upstream
