const LessonFourIntro = () => {
  return (
    <div className="p-6 mb-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm space-y-6">
      <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm space-y-6">

        {/* Intro */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            🛡 OWASP Top 10 – The Industry Security Baseline
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The OWASP Top 10 is a globally recognized list of the most critical
            web application security risks. It is used by developers,
            penetration testers, auditors, and organizations to understand
            where applications fail most often.
          </p>
        </section>

        {/* What it is */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            📌 What Is the OWASP Top 10?
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Rather than listing specific bugs, the OWASP Top 10 groups
            vulnerabilities into risk categories based on real-world attack
            data, impact, and likelihood.
          </p>

          <div className="mt-3 p-4 rounded-xl bg-background/40 border border-border/40 text-sm">
            ✅ It focuses on <strong>risk</strong>, not just code mistakes.
          </div>
        </section>

        {/* Why it matters */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            🎯 Why the OWASP Top 10 Matters
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Guides secure application design</li>
            <li>Helps prioritize security fixes</li>
            <li>Used in compliance and security audits</li>
            <li>Teaches attackers’ most common entry points</li>
          </ul>
        </section>

        {/* Categories overview */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            📂 Common OWASP Top 10 Risk Categories
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              ["Injection", "Untrusted input executed as code"],
              ["Broken Authentication", "Weak login or session handling"],
              ["Sensitive Data Exposure", "Improper encryption of data"],
              ["Broken Access Control", "Unauthorized access to resources"],
              ["Security Misconfiguration", "Unsafe default settings"],
              ["XSS", "Malicious scripts in the browser"],
              ["Insecure Deserialization", "Unsafe object handling"],
              ["Using Vulnerable Components", "Outdated libraries"],
              ["Insufficient Logging", "No detection of attacks"],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="p-3 rounded-xl bg-background/40 border border-border/40"
              >
                <span className="font-medium">{title}:</span>{" "}
                <span className="text-muted-foreground">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Risk mindset */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            ⚠️ Understanding Risk (Not Just Bugs)
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A vulnerability becomes dangerous when it can be exploited. OWASP
            evaluates risk by combining:
          </p>

          <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
            <li>Ease of exploitation</li>
            <li>Technical impact</li>
            <li>Business impact</li>
          </ul>
        </section>

        {/* How this course uses OWASP */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            🧪 How This Platform Uses the OWASP Top 10
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            In the following lessons, each OWASP risk is broken down using:
            real vulnerable code, secure alternatives, interactive demos, and
            prevention strategies you can directly apply in MERN applications.
          </p>

          <div className="mt-3 p-4 rounded-xl bg-muted text-sm">
            👉 You’ll learn <strong>how attackers think</strong> and
            <strong> how to defend as a developer</strong>.
          </div>
        </section>

      </div>
    </div>
  );
};

export default LessonFourIntro;
