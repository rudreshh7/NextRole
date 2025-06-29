# Security Policy

## Supported Versions

We currently provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in TalentForge, please report it responsibly:

1. **Do not** create a public GitHub issue
2. Email us directly at: security@your-domain.com
3. Include detailed information about the vulnerability
4. Allow us time to address the issue before public disclosure

## Security Features

### Authentication
- NextAuth.js v5 with JWT strategy
- GitHub OAuth integration
- Secure session management
- CSRF protection built-in

### Database Security
- Prisma ORM with parameterized queries
- SQL injection prevention
- Database connection pooling
- Unique constraints enforced

### HTTP Security
- Security headers configured:
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: origin-when-cross-origin
- HTTPS enforcement in production
- Secure cookie settings

### Data Protection
- User data encrypted in transit
- Sensitive data not logged
- Environment variables secured
- No hardcoded secrets

## Best Practices

1. Keep dependencies updated
2. Use strong secrets for production
3. Enable HTTPS in production
4. Regularly backup your database
5. Monitor for security issues
6. Follow OWASP guidelines
