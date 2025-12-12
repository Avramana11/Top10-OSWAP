const LessonThree = () => {
  return (
    <div className="p-6 mb-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm space-y-6">
      <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm space-y-6">

        {/* Section 1 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            🧱 Core Security Concepts Every Developer Must Know
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Secure applications are not built by chance. They are designed using
            proven security principles that reduce risk, limit damage, and prevent
            vulnerabilities even when mistakes happen.
          </p>
        </section>

        {/* Principle 1 */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            🔑 Principle of Least Privilege
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Least privilege means granting users, services, and processes only
            the minimum permissions required to perform their task — nothing more.
          </p>

          <div className="mt-3 p-4 rounded-xl bg-background/40 border border-border/40 text-sm">
            ✅ If an account is compromised, limited permissions reduce the
            <strong> blast radius</strong>.
          </div>

          <ul className="mt-3 list-disc list-inside text-sm text-muted-foreground">
            <li>Users shouldn’t access admin routes by default</li>
            <li>Database users should not have full control</li>
            <li>APIs should restrict actions by role</li>
          </ul>
        </section>

        {/* Principle 2 */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            ✅ Input Validation & Sanitization
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Never trust user input. Validation ensures data matches expected
            format, while sanitization removes dangerous characters or scripts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-sm">
            <div className="p-4 rounded-xl bg-background/40 border border-border/40">
              <div className="font-medium mb-1">Validation</div>
              <p className="text-muted-foreground">
                Checks correctness (length, type, pattern).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-background/40 border border-border/40">
              <div className="font-medium mb-1">Sanitization</div>
              <p className="text-muted-foreground">
                Removes or escapes dangerous data.
              </p>
            </div>
          </div>

          <div className="mt-3 p-4 rounded-xl bg-muted text-sm">
            ❗ Always validate on the <strong>server side</strong> — client-side
            checks can be bypassed.
          </div>
        </section>

        {/* Principle 3 */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            🧯 Secure Defaults & Hardening
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Secure systems should start locked down. Developers should explicitly
            enable access instead of relying on permissive defaults.
          </p>

          <ul className="mt-3 list-disc list-inside text-sm text-muted-foreground">
            <li>Disable unused features and routes</li>
            <li>Hide detailed error messages in production</li>
            <li>Use strong password and session policies</li>
            <li>Enable HTTPS and secure headers</li>
          </ul>
        </section>

        {/* Defense in Depth */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            🛡 Defense in Depth
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Defense in depth means using multiple layers of security so that if
            one control fails, others still protect the system.
          </p>

          <ul className="mt-3 text-sm list-disc list-inside text-muted-foreground">
            <li>Input validation + authentication</li>
            <li>Authorization + logging</li>
            <li>Rate limiting + monitoring</li>
          </ul>
        </section>

        {/* Real-world analogy */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            🏰 Real-World Analogy
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Think of security like a castle:
            <br />• Walls → validation
            <br />• Guards → authentication
            <br />• Locked doors → authorization
            <br />• Alarms → monitoring & logs
          </p>
        </section>

        {/* Transition */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            ✅ Why These Concepts Matter
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Most vulnerabilities happen not because developers lack tools, but
            because these principles were ignored or misunderstood. Applying them
            consistently makes applications resilient by design.
          </p>
        </section>

      </div>
    </div>
  );
};

export default LessonThree;
