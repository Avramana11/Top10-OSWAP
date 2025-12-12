const LessonTwoIntro = () => {
  return (
     <div className="p-6 mb-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm space-y-6">
      <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm space-y-6">

        {/* Section 1 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            🎯 How Web Attacks Actually Work
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Web attacks don’t happen randomly. Attackers follow a structured
            process to identify weaknesses, exploit them, and extract value.
            Understanding this flow helps developers design stronger defenses.
          </p>
        </section>

        {/* Attack Lifecycle */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            🔄 Typical Attack Lifecycle
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            {[
              [
                "Reconnaissance",
                "Collect information such as URLs, inputs, headers, and APIs.",
              ],
              [
                "Exploitation",
                "Abuse weak validation, auth flaws, or misconfigurations.",
              ],
              [
                "Persistence",
                "Maintain access using backdoors or stolen credentials.",
              ],
              [
                "Exfiltration",
                "Steal sensitive data like user info or tokens.",
              ],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="p-4 rounded-xl bg-background/40 border border-border/40"
              >
                <div className="font-medium mb-1">{title}</div>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Boundaries */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            🔓 Trust Boundaries Explained
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A trust boundary is any point where data moves from an untrusted
            source (user input, API, browser) to trusted logic (server, database).
          </p>

          <div className="mt-3 p-4 rounded-xl bg-muted text-sm">
            ❗ Most vulnerabilities occur when applications <strong>blindly trust input</strong>
            coming from the client.
          </div>
        </section>

        {/* Common Attack Vectors */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            ⚔️ Common Web Attack Vectors
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              ["Injection", "Manipulating queries or commands using input."],
              ["XSS", "Injecting malicious scripts into web pages."],
              ["Auth Abuse", "Bypassing login, tokens, or sessions."],
              ["CSRF", "Forcing users to perform unwanted actions."],
              ["IDOR", "Accessing data by modifying object IDs."],
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

        {/* Developer Mindset */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            🧠 Attacker vs Developer Mindset
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Developers think in terms of features and workflows. Attackers think
            in terms of breaking assumptions:
          </p>

          <ul className="mt-3 text-sm list-disc list-inside text-muted-foreground">
            <li>“What happens if I modify this request?”</li>
            <li>“Is this input validated server-side?”</li>
            <li>“What if I skip this step entirely?”</li>
          </ul>
        </section>

        {/* Transition */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            ✅ Why This Matters for Secure Coding
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Secure code assumes users may act maliciously. Validation, access
            control, and defensive checks must exist on the server, not the client.
            The next section shows how weak policies fail — and how strong ones
            stop attacks.
          </p>
        </section>

      </div>
    </div>
  );
};

export default LessonTwoIntro;
