const LessonOneIntro = () => {
  return (
    <div className="p-6 mb-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm space-y-6">
      <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm mb-8 space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-2">
                    🌐 The Big Picture of Web Security
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Web security is about protecting users, applications, and
                    data from malicious actions. Every time a user submits a
                    form, logs in, or requests data, your application is exposed
                    to potential misuse if security is not properly implemented.
                  </p>
                </section>
                <section>
                  <h3 className="text-lg font-semibold mb-3">
                    🔺 Core Security Goals (CIA Triad)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="p-4 rounded-xl bg-background/40 border border-border/40">
                      <div className="font-medium mb-1">Confidentiality</div>
                      <p className="text-muted-foreground">
                        Sensitive data remains private (e.g., passwords).
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-background/40 border border-border/40">
                      <div className="font-medium mb-1">Integrity</div>
                      <p className="text-muted-foreground">
                        Data is not altered by unauthorized users.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-background/40 border border-border/40">
                      <div className="font-medium mb-1">Availability</div>
                      <p className="text-muted-foreground">
                        Applications stay accessible when needed.
                      </p>
                    </div>
                  </div>
                </section>
                {/* Key Terms */}
                <section>
                  <h3 className="text-lg font-semibold mb-3">
                    📘 Essential Security Terms
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {[
                      ["Threat", "A potential cause of harm (e.g., attacker)."],
                      ["Vulnerability", "A weakness in code or design."],
                      ["Attack", "Exploiting a vulnerability."],
                      ["Risk", "Likelihood and impact of an attack."],
                      ["Control", "A protection mechanism (validation, auth)."],
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
                {/* Real-life Analogy */}
                <section>
                  <h3 className="text-lg font-semibold mb-3">
                    🏠 Real-Life Analogy
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Think of a web application like a house:
                    <br />• No lock → vulnerable system
                    <br />• Thief → threat
                    <br />• Break-in → attack
                    <br />• Lock & alarm → security controls
                  </p>
                </section>

                {/* OWASP */}
                <section>
                  <h3 className="text-lg font-semibold mb-3">
                    🛡 What is OWASP?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    OWASP (Open Web Application Security Project) is a global
                    community that improves software security by publishing
                    research, tools, and educational resources such as the OWASP
                    Top 10.
                  </p>
                </section>
              </div>
    </div>
  );
};

export default LessonOneIntro;
