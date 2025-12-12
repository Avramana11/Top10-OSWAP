export const vulnerabilities = [
  {
    id: "injection",
    rank: 1,
    title: "A01:2021 - Injection",
    shortTitle: "Injection",
    severity: "critical",
    description: "Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query. The attacker's hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.",
    realWorldExample: "In 2017, Equifax suffered a massive data breach affecting 147 million people. Attackers exploited an Apache Struts vulnerability that allowed command injection, leading to one of the largest data breaches in history.",
    vulnerableCode: {
      language: "javascript",
      code: `// ❌ VULNERABLE: Direct string concatenation
const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";

// Attacker input: username = "admin' --"
// Results in: SELECT * FROM users WHERE username = 'admin' --' AND password = ''
// The -- comments out the password check!`,
      explanation: "This code directly concatenates user input into a SQL query. An attacker can inject malicious SQL code to bypass authentication or extract sensitive data."
    },
    secureCode: {
      language: "javascript",
      code: `// ✅ SECURE: Using parameterized queries
const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
const result = await db.query(query, [username, hashedPassword]);

// Or with an ORM like Prisma:
const user = await prisma.user.findFirst({
  where: {
    username: username,
    password: hashedPassword
  }
});`,
      explanation: "Parameterized queries separate SQL code from data. The database treats user input as data only, never as executable code, preventing injection attacks."
    },
    prevention: [
      "Use parameterized queries or prepared statements",
      "Use ORM frameworks with built-in protection",
      "Validate and sanitize all user inputs",
      "Apply least privilege principles to database accounts",
      "Use stored procedures with parameterized inputs"
    ],
    icon: "/Injection.png",
    interactiveDemo: 'nosqlLoginBypass',
    demoHints: ['{"$ne": null}', '{"$or": [{"password": {"$ne": ""}}, {"password": null}]}', "' OR 1=1", "' OR '1'='1"],
    demoUsers: [{ email: 'admin@example.com', password: 'Admin123!' }]
  },
  {
    id: "broken-authentication",
    rank: 2,
    title: "A02:2021 - Cryptographic Failures",
    shortTitle: "Cryptographic Failures",
    severity: "critical",
    description: "Previously known as Sensitive Data Exposure, this vulnerability focuses on failures related to cryptography which often leads to sensitive data exposure. This includes weak encryption, improper key management, and transmitting data in clear text.",
    realWorldExample: "Adobe's 2013 breach exposed 153 million user records. Passwords were encrypted with a weak, reversible encryption instead of proper hashing, allowing attackers to crack millions of passwords.",
    vulnerableCode: {
      language: "javascript",
      code: `// ❌ VULNERABLE: Weak encryption and storage
const crypto = require('crypto');

// Using MD5 (broken hash function)
const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

// Storing sensitive data in plain text
const userData = {
  ssn: "123-45-6789",
  creditCard: "4532-1234-5678-9012"
};`,
      explanation: "MD5 is a broken hash function that can be reversed using rainbow tables. Sensitive data like SSN and credit cards should never be stored in plain text."
    },
    secureCode: {
      language: "javascript",
      code: `// ✅ SECURE: Strong hashing and encryption
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Use bcrypt for passwords (with salt rounds)
const hashedPassword = await bcrypt.hash(password, 12);

// Encrypt sensitive data with AES-256
const algorithm = 'aes-256-gcm';
const key = crypto.scryptSync(secretKey, 'salt', 32);
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv(algorithm, key, iv);`,
      explanation: "Bcrypt includes automatic salting and is designed to be slow, making brute-force attacks impractical. AES-256-GCM provides authenticated encryption for sensitive data."
    },
    prevention: [
      "Use strong, modern encryption algorithms (AES-256, RSA-2048+)",
      "Hash passwords with bcrypt, scrypt, or Argon2",
      "Use TLS 1.3 for data in transit",
      "Implement proper key management",
      "Classify and encrypt sensitive data at rest"
    ],
    icon: "/Crypto.png",
    interactiveDemo: 'cryptoDemo',
    demoHints: ['Switch to md5/sha1/plaintext to see risk', 'Try bcrypt for safe storage']
  },
  {
    id: "broken-access-control",
    rank: 3,
    title: "A03:2021 - Broken Access Control",
    shortTitle: "Broken Access Control",
    severity: "critical",
    description: "Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of all data or performing a business function outside the user's limits.",
    realWorldExample: "In 2019, First American Financial exposed 885 million records due to an IDOR vulnerability. Simply changing the document ID in the URL allowed access to any customer's sensitive documents.",
    vulnerableCode: {
      language: "javascript",
      code: `// ❌ VULNERABLE: No authorization check
app.get('/api/user/:id/profile', async (req, res) => {
  const userId = req.params.id;
  // Anyone can access any user's profile!
  const profile = await db.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);
  res.json(profile);
});

// ❌ VULNERABLE: Client-side role check only
if (user.role === 'admin') {
  showAdminPanel();
}`,
      explanation: "The API doesn't verify if the requesting user has permission to access the requested profile. Client-side checks can be easily bypassed by modifying JavaScript."
    },
    secureCode: {
      language: "javascript",
      code: `// ✅ SECURE: Proper authorization checks
app.get('/api/user/:id/profile', authenticate, async (req, res) => {
  const requestedId = req.params.id;
  const currentUser = req.user;
  
  // Check if user can access this profile
  if (currentUser.id !== requestedId && currentUser.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  const profile = await db.query('SELECT * FROM profiles WHERE user_id = $1', [requestedId]);
  res.json(profile);
});`,
      explanation: "Always verify authorization on the server-side. Check if the current authenticated user has permission to access the requested resource."
    },
    prevention: [
      "Implement access control on the server-side",
      "Deny access by default",
      "Use role-based access control (RBAC)",
      "Log access control failures and alert on repeated failures",
      "Disable directory listing and remove sensitive files from web roots"
    ],
    icon: "/cyber-threat.png",
    interactiveDemo: 'accessControlDemo',
    demoHints: ['Set Current User ID 1, Requested ID 2', 'Switch role user/admin', 'Secure mode should deny IDOR']
  },
  {
    id: "insecure-design",
    rank: 4,
    title: "A04:2021 - Insecure Design",
    shortTitle: "Insecure Design",
    severity: "high",
    description: "Insecure design is a broad category representing different weaknesses, expressed as 'missing or ineffective control design.' It's about failing to determine the security controls required during the design phase.",
    realWorldExample: "A movie chain allowed bulk ticket purchases without rate limiting. Attackers wrote scripts to buy all tickets for popular showings and resell them at inflated prices.",
    vulnerableCode: {
      language: "javascript",
      code: `// ❌ VULNERABLE: No rate limiting on sensitive operations
app.post('/api/password-reset', async (req, res) => {
  const { email } = req.body;
  // No limit on reset attempts - allows enumeration
  const user = await findUserByEmail(email);
  if (user) {
    await sendResetEmail(user);
    res.json({ message: 'Reset email sent' });
  } else {
    res.json({ message: 'User not found' }); // Info disclosure!
  }
});`,
      explanation: "Without rate limiting, attackers can enumerate valid emails. Different responses for existing vs non-existing users leak information."
    },
    secureCode: {
      language: "javascript",
      code: `// ✅ SECURE: Rate limiting and consistent responses
const rateLimit = require('express-rate-limit');

const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 attempts per window
  message: 'Too many requests, try again later'
});

app.post('/api/password-reset', resetLimiter, async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  
  if (user) {
    await sendResetEmail(user);
  }
  // Always return the same response
  res.json({ message: 'If the email exists, a reset link was sent' });
});`,
      explanation: "Rate limiting prevents abuse. Consistent responses prevent user enumeration. The attacker can't determine if an email exists in the system."
    },
    prevention: [
      "Use threat modeling during design phase",
      "Implement rate limiting on all sensitive operations",
      "Design with defense in depth",
      "Segregate tenants in multi-tenant systems",
      "Write unit and integration tests for security controls"
    ],
    icon: "/icons8-shielding-48.png",
    interactiveDemo: 'insecureDesignDemo',
    demoHints: ['Try a non-existing email', 'Click Check >3 times in strong mode', 'Observe uniform responses']
  },
  {
    id: "security-misconfiguration",
    rank: 5,
    title: "A05:2021 - Security Misconfiguration",
    shortTitle: "Security Misconfiguration",
    severity: "high",
    description: "Security misconfiguration is the most commonly seen issue. This includes insecure default configurations, incomplete configurations, open cloud storage, misconfigured HTTP headers, and verbose error messages containing sensitive information.",
    realWorldExample: "In 2019, Capital One's misconfigured AWS WAF allowed an attacker to access 100+ million customer records through a Server Side Request Forgery (SSRF) attack.",
    vulnerableCode: {
      language: "javascript",
      code: `// ❌ VULNERABLE: Misconfigured Express app
const express = require('express');
const app = express();

// Debug mode in production
app.set('env', 'development');

// No security headers
// Missing: helmet, CORS, rate limiting

// Verbose error messages
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: err.stack, // Exposes internal paths!
    query: req.query
  });
});`,
      explanation: "Development settings in production expose debug info. Missing security headers leave the app vulnerable. Detailed error messages help attackers understand your system."
    },
    secureCode: {
      language: "javascript",
      code: `// ✅ SECURE: Properly configured Express app
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Security headers
app.use(helmet());
app.use(cors({ origin: 'https://yourdomain.com' }));

// Production error handler
app.use((err, req, res, next) => {
  console.error(err); // Log internally
  res.status(500).json({
    error: 'An unexpected error occurred',
    requestId: req.id // For support, not debugging
  });
});`,
      explanation: "Helmet adds security headers automatically. CORS restricts cross-origin requests. Generic error messages don't expose system details while still being useful."
    },
    prevention: [
      "Automate security configuration verification",
      "Use minimal platforms without unnecessary features",
      "Implement proper security headers",
      "Review cloud storage permissions regularly",
      "Send security directives to clients (CSP, X-Frame-Options)"
    ],
    icon: "/icons8-grand-master-key-48.png",
    interactiveDemo: 'securityMisconfigDemo',
    demoHints: ['Origin http://evil.com', 'Toggle Simulate Error', 'Switch Secure mode to see restrictions']
  },
  {
    id: "vulnerable-components",
    rank: 6,
    title: "A06:2021 - Vulnerable Components",
    shortTitle: "Vulnerable Components",
    severity: "high",
    description: "Components such as libraries, frameworks, and other software modules run with the same privileges as the application. If a vulnerable component is exploited, such an attack can facilitate serious data loss or server takeover.",
    realWorldExample: "The Log4Shell vulnerability (CVE-2021-44228) in Apache Log4j affected millions of applications worldwide, allowing remote code execution through a simple log message.",
    vulnerableCode: {
      language: "json",
      code: `{
  "dependencies": {
    "lodash": "4.17.4",     // CVE-2019-10744: Prototype pollution
    "express": "4.16.0",    // Multiple vulnerabilities
    "moment": "2.19.1",     // ReDoS vulnerability
    "jquery": "2.2.4"       // XSS vulnerabilities
  }
}

// No package-lock.json = inconsistent builds
// No automated security scanning`,
      explanation: "Outdated dependencies contain known vulnerabilities that attackers actively exploit. Without lock files, you may get different versions on different machines."
    },
    secureCode: {
      language: "json",
      code: `{
  "dependencies": {
    "lodash": "^4.17.21",
    "express": "^4.18.2",
    "date-fns": "^2.30.0",
    "jquery": "^3.7.0"
  },
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix",
    "deps:check": "npx npm-check-updates"
  }
}

// package-lock.json committed to repo
// CI/CD runs: npm audit --audit-level=high`,
      explanation: "Keep dependencies updated. Use lock files for reproducible builds. Automate vulnerability scanning in your CI/CD pipeline."
    },
    prevention: [
      "Remove unused dependencies and features",
      "Continuously inventory component versions",
      "Monitor CVE databases for vulnerabilities",
      "Only obtain components from official sources",
      "Subscribe to security bulletins for used components"
    ],
    icon: "/icons8-bug-64.png",
    interactiveDemo: 'vulnerableComponentsDemo',
    demoHints: ['Switch to Outdated to see risk', 'Toggle to Updated to see audits']
  },
  {
    id: "authentication-failures",
    rank: 7,
    title: "A07:2021 - Auth Failures",
    shortTitle: "Authentication Failures",
    severity: "critical",
    description: "Confirmation of the user's identity, authentication, and session management is critical to protect against authentication-related attacks. Weak passwords, credential stuffing, and session fixation are common issues.",
    realWorldExample: "The 2016 Uber breach occurred when attackers found hardcoded AWS credentials in a GitHub repository, gaining access to 57 million user records.",
    vulnerableCode: {
      language: "javascript",
      code: `// ❌ VULNERABLE: Weak authentication
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // No brute force protection
  const user = await db.query(
    'SELECT * FROM users WHERE username = $1 AND password = $2',
    [username, password] // Plain text password comparison!
  );
  
  if (user) {
    // Session never expires
    req.session.userId = user.id;
    req.session.cookie.maxAge = null; // Never expires!
  }
});`,
      explanation: "No brute force protection allows unlimited login attempts. Plain text password storage/comparison is catastrophic. Sessions without expiration are easily hijacked."
    },
    secureCode: {
      language: "javascript",
      code: `// ✅ SECURE: Strong authentication
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true
});

app.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  const user = await findUser(username);
  
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    // Generic message prevents enumeration
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Regenerate session, set expiration
  req.session.regenerate(() => {
    req.session.userId = user.id;
    req.session.cookie.maxAge = 30 * 60 * 1000; // 30 min
  });
});`,
      explanation: "Rate limiting prevents brute force. Bcrypt securely compares hashed passwords. Session regeneration prevents fixation. Short expiration limits exposure."
    },
    prevention: [
      "Implement multi-factor authentication",
      "Don't ship with default credentials",
      "Implement weak password checks",
      "Use secure session management",
      "Log authentication failures and alert on anomalies"
    ],
    icon: "/icons8-error-100.png",
    interactiveDemo: 'authFailuresDemo',
    demoHints: ['Try wrong password repeatedly', 'Reset attempts then switch to strong']
  },
  {
    id: "data-integrity-failures",
    rank: 8,
    title: "A08:2021 - Integrity Failures",
    shortTitle: "Data Integrity Failures",
    severity: "high",
    description: "Software and data integrity failures relate to code and infrastructure that does not protect against integrity violations. This includes insecure CI/CD pipelines, auto-updates without verification, and insecure deserialization.",
    realWorldExample: "The 2020 SolarWinds attack compromised their software build system, allowing attackers to inject malware into updates that were then distributed to 18,000+ organizations.",
    vulnerableCode: {
      language: "javascript",
      code: `// ❌ VULNERABLE: Insecure deserialization
const deserialize = require('node-serialize');

app.post('/api/restore-session', (req, res) => {
  const sessionData = req.body.session;
  // Deserializing untrusted data - RCE possible!
  const session = deserialize.unserialize(sessionData);
  req.session = session;
});

// ❌ VULNERABLE: Loading scripts without integrity
<script src="https://cdn.example.com/lib.js"></script>`,
      explanation: "Deserializing untrusted data can lead to Remote Code Execution. External scripts without integrity checks can be modified by attackers (supply chain attack)."
    },
    secureCode: {
      language: "javascript",
      code: `// ✅ SECURE: Safe data handling
app.post('/api/restore-session', (req, res) => {
  const sessionData = req.body.session;
  // Parse JSON, validate schema
  const parsed = JSON.parse(sessionData);
  const validated = sessionSchema.safeParse(parsed);
  
  if (!validated.success) {
    return res.status(400).json({ error: 'Invalid session data' });
  }
  req.session = validated.data;
});

// ✅ SECURE: Subresource Integrity (SRI)
<script 
  src="https://cdn.example.com/lib.js"
  integrity="sha384-abc123..."
  crossorigin="anonymous"
></script>`,
      explanation: "Use JSON.parse instead of unserialize. Validate all data against schemas. SRI ensures scripts haven't been tampered with using cryptographic hashes."
    },
    prevention: [
      "Use digital signatures to verify software integrity",
      "Verify npm/pip packages are from trusted repos",
      "Use SRI for external resources",
      "Implement a secure CI/CD pipeline",
      "Review code changes before deployment"
    ],
    icon: "/icons8-data-integrity-68.png",
    interactiveDemo: 'integrityFailuresDemo',
    demoHints: ['Add integrity for external script', 'Change host to non-allowlisted', 'Provide valid JSON name']
  },
  {
    id: "logging-monitoring-failures",
    rank: 9,
    title: "A09:2021 - Logging Failures",
    shortTitle: "Logging Failures",
    severity: "medium",
    description: "Insufficient logging, detection, monitoring, and active response allows attackers to further attack systems, maintain persistence, pivot to more systems, and tamper, extract, or destroy data.",
    realWorldExample: "The average time to detect a breach is 197 days. Many organizations only discover breaches when notified by external parties or law enforcement.",
    vulnerableCode: {
      language: "javascript",
      code: `// ❌ VULNERABLE: No security logging
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await authenticate(username, password);
  
  if (user) {
    res.json({ token: generateToken(user) });
  } else {
    res.status(401).json({ error: 'Failed' });
    // No logging of failed attempt!
    // No alerting on repeated failures!
  }
});

// ❌ VULNERABLE: Logging sensitive data
console.log(\`Login attempt: \${username}, \${password}\`);`,
      explanation: "Without logging, you can't detect attacks in progress or investigate incidents. Logging passwords exposes them in log files, violating privacy."
    },
    secureCode: {
      language: "javascript",
      code: `// ✅ SECURE: Comprehensive security logging
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'security.log' })]
});

app.post('/login', async (req, res) => {
  const { username } = req.body;
  const user = await authenticate(username, password);
  
  if (user) {
    logger.info('Login success', { 
      username, 
      ip: req.ip, 
      timestamp: new Date().toISOString() 
    });
    res.json({ token: generateToken(user) });
  } else {
    logger.warn('Login failed', { 
      username, 
      ip: req.ip,
      attemptCount: await getAttemptCount(req.ip)
    });
    await checkAndAlertBruteForce(req.ip);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});`,
      explanation: "Log security events with relevant context (IP, timestamp). Never log passwords or tokens. Implement alerting for suspicious patterns."
    },
    prevention: [
      "Log all authentication and access control events",
      "Ensure logs contain sufficient context",
      "Use centralized log management",
      "Establish effective monitoring and alerting",
      "Have an incident response plan ready"
    ],
    icon: "/icons8-authentication-80.png",
    interactiveDemo: 'loggingFailuresDemo',
    demoHints: ['Try wrong password 3+ times', 'Switch to strong and observe logs', 'Clear logs and retry']
  },
  {
    id: "ssrf",
    rank: 10,
    title: "A10:2021 - SSRF",
    shortTitle: "Server-Side Request Forgery",
    severity: "high",
    description: "SSRF flaws occur when a web application fetches a remote resource without validating the user-supplied URL. It allows an attacker to coerce the application to send a crafted request to an unexpected destination.",
    realWorldExample: "The Capital One 2019 breach exploited SSRF to access AWS metadata service (169.254.169.254), obtaining IAM credentials that led to 100M+ records being exposed.",
    vulnerableCode: {
      language: "javascript",
      code: `// ❌ VULNERABLE: Unvalidated URL fetch
app.get('/api/fetch-url', async (req, res) => {
  const { url } = req.query;
  
  // Attacker can request:
  // - http://169.254.169.254/latest/meta-data/ (AWS credentials)
  // - http://localhost:6379/ (internal Redis)
  // - file:///etc/passwd (local files)
  
  const response = await fetch(url);
  res.send(await response.text());
});`,
      explanation: "Without URL validation, attackers can use your server to access internal services, cloud metadata endpoints, or read local files."
    },
    secureCode: {
      language: "javascript",
      code: `// ✅ SECURE: URL validation and allowlisting
const { URL } = require('url');

const ALLOWED_DOMAINS = ['api.example.com', 'cdn.example.com'];
const BLOCKED_IPS = ['127.0.0.1', '169.254.169.254', '10.', '172.16.', '192.168.'];

app.get('/api/fetch-url', async (req, res) => {
  const { url } = req.query;
  
  try {
    const parsed = new URL(url);
    
    // Validate protocol
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return res.status(400).json({ error: 'Invalid protocol' });
    }
    
    // Check allowlist
    if (!ALLOWED_DOMAINS.some(d => parsed.hostname.endsWith(d))) {
      return res.status(400).json({ error: 'Domain not allowed' });
    }
    
    // Resolve and check IP
    const ip = await dns.resolve(parsed.hostname);
    if (BLOCKED_IPS.some(blocked => ip.startsWith(blocked))) {
      return res.status(400).json({ error: 'Invalid destination' });
    }
    
    const response = await fetch(url);
    res.send(await response.text());
  } catch (e) {
    res.status(400).json({ error: 'Invalid URL' });
  }
});`,
      explanation: "Validate URLs against an allowlist. Block internal IP ranges and metadata endpoints. Never trust user-supplied URLs for server-side requests."
    },
    prevention: [
      "Sanitize and validate all user-supplied URLs",
      "Use allowlists for permitted domains",
      "Block requests to internal IP ranges",
      "Disable HTTP redirections if not needed",
      "Use network segmentation to limit SSRF impact"
    ],
    icon: "/icons8-server-100.png",
    interactiveDemo: 'ssrfDemo',
    demoHints: ['169.254.169.254', 'localhost or 127.0.0.1', 'Switch to strong to see blocking']
  }
];

export const getSeverityColor = (severity) => {
  const colors = {
    critical: 'bg-severity-critical',
    high: 'bg-severity-high',
    medium: 'bg-severity-medium',
    low: 'bg-severity-low'
  };
  return colors[severity];
};

export const getSeverityTextColor = (severity) => {
  const colors = {
    critical: 'text-severity-critical',
    high: 'text-severity-high',
    medium: 'text-severity-medium',
    low: 'text-severity-low'
  };
  return colors[severity];
};
