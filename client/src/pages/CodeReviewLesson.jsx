import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import CodeBlock from '@/components/ui/CodeBlock'
import { useAuth } from '@/context/AuthContext'
import api from '@/lib/api'

const LESSONS = {
  'cr-1': {
    title: 'Introduction to Secure Code Review',
    description: 'How to systematically review code and identify insecure patterns.',
     intro: {
    heading: '🔍 How Secure Code Review Works',
    sections: [
      {
        title: 'What Is Secure Code Review?',
        text: 'Secure code review is the process of manually inspecting source code to identify security vulnerabilities before attackers do.'
      },
      {
        title: 'Reviewer Mindset',
        text: 'A reviewer does not assume inputs are safe. Every external input is treated as attacker-controlled.'
      },
      {
        title: 'Primary Review Goals',
        bullets: [
          'Identify trust boundaries',
          'Find missing validations',
          'Check authorization enforcement',
          'Locate dangerous APIs'
        ]
      },
      {
        title: 'Real-World Context',
        text: 'Most production vulnerabilities are discovered during audits and peer reviews—not by scanners.'
      }
    ]
  },
    lookFor: [
      'Input handling and validation',
      'Authentication and session usage',
      'Authorization checks at boundaries',
      'Error handling and logging',
    ],
    vulnerable: {
      code: `function parseUser(input){ return JSON.parse(input) }`,
      explanation: 'Blindly parsing untrusted input can trigger exceptions or lead to unsafe flows.',
    },
    secure: {
      code: `function parseUserSafe(input){ try{ const obj = JSON.parse(input); if(!obj || typeof obj!== 'object') return null; return obj } catch{ return null } }`,
      explanation: 'Validate shape and handle parse errors gracefully.',
    },
    dangerous: 'Ignoring input validation and error handling increases risk of undefined behavior and exploitation.',
    fix: 'Validate types and ranges, sanitize where appropriate, and handle errors without leaking sensitive details.',
    quiz: [
      { q: 'During review, prioritize checking?', options: ['Input handling', 'Icon colors', 'Whitespace'], a: 0 },
    ],
  },
  'cr-2': {
    title: 'SQL Injection Patterns',
    description: 'Spot unsafe query construction and prefer parameterized statements.',
      intro: {
    heading: '🧠 How Reviewers Detect SQL Injection',
    sections: [
      {
        title: 'Why SQL Injection Still Happens',
        text: 'SQL Injection remains one of the most dangerous vulnerabilities because databases trust queries they receive. If attackers can influence query structure, they can read, modify, or delete sensitive data.'
      },
      {
        title: 'Reviewer Mindset',
        text: 'During code review, assume every value reaching a database query is attacker-controlled unless proven otherwise.'
      },
      {
        title: 'What Reviewers Trace',
        bullets: [
          'User input flowing into SQL queries',
          'Dynamic query construction',
          'Manual escaping instead of binding',
          'Use of raw query APIs'
        ]
      },
      {
        title: 'Real-World Impact',
        text: 'Real-world SQL injections have caused massive data breaches, credential leaks, and full database compromise in production systems.'
      }
    ]
  },
    lookFor: ['String concatenation with user input', 'Missing parameter binding'],
    vulnerable: { code: `db.query("SELECT * FROM users WHERE name='" + name + "'")`, explanation: 'Concatenating user input into SQL enables injection.' },
    secure: { code: `db.query("SELECT * FROM users WHERE name=?", [name])`, explanation: 'Use parameterized queries to prevent injection.' },
    dangerous: 'Attackers can alter queries to access or modify data.',
    fix: 'Bind parameters and validate inputs; use ORM/query builders safely.',
    quiz: [
      { q: 'Safe SQL practice?', options: ['Parameterized queries', 'String concatenation', 'Inline literals'], a: 0 },
      { q: 'Risk from unsafe concatenation?', options: ['Injection', 'Layout issues', 'Caching'], a: 0 },
    ],
  },
  'cr-3': {
    title: 'XSS Detection Patterns',
    description: 'Identify unescaped rendering paths and prefer safe APIs.',
     intro: {
    heading: '⚠️ How Reviewers Think About XSS',
    sections: [
      {
        title: 'Why XSS Is So Dangerous',
        text: 'Cross-Site Scripting allows attackers to run malicious JavaScript in a victim’s browser, stealing cookies, hijacking sessions, and performing actions as the user.'
      },
      {
        title: 'Reviewer Mindset',
        text: 'Whenever data is rendered into the DOM, reviewers ask: “Where did this data come from, and is it properly encoded?”'
      },
      {
        title: 'What Reviewers Trace',
        bullets: [
          'User input rendered in HTML',
          'Use of innerHTML or dangerous templating',
          'Missing output encoding',
          'Server data injected into client-side scripts'
        ]
      },
      {
        title: 'Real-World Impact',
        text: 'Many high-profile breaches started with a single unescaped value that allowed attackers to persist scripts across users.'
      }
    ]
  },
    lookFor: ['Direct innerHTML assignments', 'Missing output encoding', 'Unsanitized template injection'],
    vulnerable: { code: `element.innerHTML = userInput`, explanation: 'Rendering untrusted input without encoding enables XSS.' },
    secure: { code: `element.textContent = userInput`, explanation: 'Prefer textContent or safe templating with automatic encoding.' },
    dangerous: 'Attackers can run scripts in the user’s browser.',
    fix: 'Encode output, sanitize input where needed, use CSP for defense in depth.',
    quiz: [
      { q: 'Safer DOM write for untrusted input?', options: ['textContent', 'innerHTML', 'document.write'], a: 0 },
      { q: 'XSS risk arises from?', options: ['Unescaped rendering', 'HTTPS', 'Lazy loading'], a: 0 },
    ],
  },
  'cr-4': {
    title: 'Authentication & Authorization Mistakes',
    description: 'Check credential handling and access checks at every entry point.',
    intro: {
    heading: '🔐 How Reviewers Evaluate Access Control',
    sections: [
      {
        title: 'Why Access Control Fails',
        text: 'Many security incidents occur not because attackers break authentication—but because applications fail to properly enforce authorization.'
      },
      {
        title: 'Reviewer Mindset',
        text: 'Reviewers never trust client-side checks and always verify that access control is enforced on the server.'
      },
      {
        title: 'What Reviewers Trace',
        bullets: [
          'Authentication validation logic',
          'Role and permission checks',
          'ID-based access (IDOR risks)',
          'Client-side only restrictions'
        ]
      },
      {
        title: 'Real-World Impact',
        text: 'Broken authorization leads to data leaks, privilege escalation, and full account takeovers.'
      }
    ]
  },
    lookFor: ['Client-side auth only', 'Missing role checks', 'IDOR'],
    vulnerable: { code: `if(clientSaysLoggedIn){ showSecret() }`, explanation: 'Trusting client claims without server-side checks is unsafe.' },
    secure: { code: `if(req.user && hasRole(req.user,'admin')){ showSecret() }`, explanation: 'Validate authentication and enforce authorization on the server.' },
    dangerous: 'Unauthorized access and data exposure.',
    fix: 'Verify tokens on the server and apply role/attribute checks consistently.',
    quiz: [
      { q: 'Authorization must be enforced?', options: ['Server-side', 'Client-only', 'CSS'], a: 0 },
    ],
  },
}

const CodeReviewLesson = () => {
  const { lessonId } = useParams()
  const { token } = useAuth()
  const [progress, setProgress] = useState(null)
  const [answers, setAnswers] = useState([])
  const [feedback, setFeedback] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverResult, setServerResult] = useState(null)
  const info = LESSONS[lessonId]

  useEffect(() => {
    api.getCodeReviewProgress(token).then((r) => setProgress(r.progress || null))
    const total = (info?.quiz || []).length
    setAnswers(Array(total).fill(null))
    setFeedback(Array(total).fill(null))
  }, [token, lessonId])

  const pct = progress?.progressPercent || 0

  const score = useMemo(() => {
    let s = 0
    const q = info?.quiz || []
    for (let i = 0; i < q.length; i++) {
      if (answers[i] === q[i].a) s++
    }
    return s
  }, [answers, info])

  const onSelect = (idx, opt) => {
    const a = [...answers]
    a[idx] = opt
    setAnswers(a)
    if (submitted) {
      const f = [...feedback]
      f[idx] = opt === info.quiz[idx].a ? 'Correct' : 'Try again'
      setFeedback(f)
    }
  }

  const onSubmitQuiz = async () => {
    setSubmitting(true)
    try {
      const r = await api.submitCodeReviewQuiz(lessonId, answers, token)
      setServerResult(r.result || null)
      setSubmitted(true)
      const f = [...feedback]
      for (let i = 0; i < info.quiz.length; i++) {
        f[i] = answers[i] === info.quiz[i].a ? 'Correct' : 'Try again'
      }
      setFeedback(f)
    } finally {
      setSubmitting(false)
    }
  }

  const onMarkCompleted = async () => {
    const r = await api.completeCodeReviewLesson(lessonId, token)
    setProgress(r.progress || progress)
  }

  if (!info) return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Lesson not found</p>
            <Link to="/learn/code-review"><Button className="mt-4" variant="outline">Back to Code Review Path</Button></Link>
          </div>
        </div>
      </main>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Progress</div>
              <div className="text-sm font-medium">{pct}%</div>
            </div>
            <Progress value={pct} />
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{info.title}</h1>
            <p className="text-muted-foreground">{info.description}</p>
          </motion.div>

          {info.intro && (
  <div className="p-6 mb-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm space-y-6">
    <h2 className="text-xl font-semibold">{info.intro.heading}</h2>

    {info.intro.sections.map((sec, i) => (
      <section key={i} className="space-y-2">
        <h3 className="text-lg font-semibold">{sec.title}</h3>
        {sec.text && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {sec.text}
          </p>
        )}
        {sec.bullets && (
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {sec.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
        )}
      </section>
    ))}
  </div>
)}


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-3">What to look for</h2>
              <ul className="list-disc ml-6 space-y-1 text-sm">
                {(info.lookFor||[]).map((t,i)=>(<li key={i}>{t}</li>))}
              </ul>
              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-2">Vulnerable Code</h3>
                <CodeBlock language="javascript" type="vulnerable" explanation={info.vulnerable.explanation} code={info.vulnerable.code} />
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Secure Code</h3>
                <CodeBlock language="javascript" type="secure" explanation={info.secure.explanation} code={info.secure.code} />
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Why this is dangerous</h3>
                <div className="text-sm text-muted-foreground">{info.dangerous}</div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">How to fix it correctly</h3>
                <div className="text-sm text-muted-foreground">{info.fix}</div>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-3">Quiz</h2>
              <div className="space-y-6">
                {(info.quiz||[]).map((item, idx) => (
                  <div key={idx}>
                    <div className="font-medium mb-2">{item.q}</div>
                    <div className="space-y-2">
                      {item.options.map((opt, j) => (
                        <label key={j} className="flex items-center gap-2 text-sm">
                          <input type="radio" name={`q${idx}`} checked={answers[idx]===j} onChange={() => onSelect(idx, j)} />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                    {submitted && feedback[idx] && <div className={`text-xs mt-2 ${feedback[idx]==='Correct'?'text-success':'text-destructive'}`}>{feedback[idx]}</div>}
                    {submitted && answers[idx] !== item.a && (
                      <div className="text-xs text-muted-foreground mt-1">Answer: {item.options[item.a]}</div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm">{submitted && serverResult ? `Submitted: ${serverResult.score} / ${serverResult.total} (attempts: ${serverResult.attempts})` : `Score: ${answers.filter((a,i)=>a===info.quiz[i].a).length} / ${info.quiz.length}`}</div>
                <div className="flex gap-2">
                  <Button onClick={onSubmitQuiz} disabled={submitting}>{submitting?'Submitting...':'Submit Quiz'}</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onMarkCompleted}>Mark as Completed</Button>
            <Link to="/learn/code-review"><Button variant="outline">Back</Button></Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CodeReviewLesson

