const LessonFiveIntro = () => {
  return (
    <div className="p-6 mb-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm space-y-6">
      <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm space-y-6">

        {/* Intro */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            🧪 Learning Security Through Vulnerable vs Secure Demos
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Security concepts become clear when you see what goes wrong.
            Vulnerable vs secure demos allow you to compare unsafe code with
            hardened implementations and understand how real defenses work.
          </p>
        </section>

        {/* Why comparisons matter */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            🔍 Why Compare Vulnerable and Secure Code?
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Highlights how small mistakes create major risks</li>
            <li>Shows how attackers exploit unsafe assumptions</li>
            <li>Teaches practical mitigation techniques</li>
            <li>Builds instinct for spotting insecure patterns</li>
          </ul>
        </section>

        {/* Vulnerable mindset */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            🚨 Common Patterns in Vulnerable Code
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Vulnerable applications often share predictable weaknesses:
          </p>

          <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
            <li>Trusting all user input</li>
            <li>Missing validation and limits</li>
            <li>Overly permissive access rules</li>
            <li>No rate limiting or abuse detection</li>
          </ul>
        </section>

        {/* Secure mindset */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            ✅ Security Controls in Secure Demos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              ["Allowlists", "Explicitly define what is permitted"],
              ["Protocol Checks", "Ensure correct formats and methods"],
              ["Rate Limiting", "Prevent brute force and abuse"],
              ["Authentication", "Verify user identity"],
              ["Authorization", "Enforce role-based access"],
              ["Safe Defaults", "Deny by default"],
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

        {/* How to study demos */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            🧠 How to Learn Effectively From These Demos
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Don’t just read the code — think like both an attacker and a defender:
          </p>

          <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
            <li>Identify the trust assumption</li>
            <li>Ask what input an attacker can control</li>
            <li>Observe where validation is missing</li>
            <li>See how secure code blocks misuse</li>
          </ul>
        </section>

        {/* Real-world tie-in */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            🌍 Real-World Developer Perspective
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            In real applications, security flaws are rarely obvious.
            Practicing with these demos builds intuition so you can spot
            weaknesses during development and code reviews.
          </p>
        </section>

        {/* Transition */}
        <section>
          <h3 className="text-lg font-semibold mb-3">
            🚀 What Comes Next
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Next, you’ll apply this approach across individual OWASP Top 10
            vulnerabilities using interactive labs, real exploit scenarios,
            and proper defenses — exactly how security professionals learn.
          </p>
        </section>

      </div>
    </div>
  );
};

export default LessonFiveIntro;
