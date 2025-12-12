import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CodeBlock from "@/components/ui/CodeBlock";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import LessonIntro from "@/components/learn/LessonIntro";

const LESSONS = [
  { lessonId: "lesson-1", title: "What is Web Security & OWASP" },
  { lessonId: "lesson-2", title: "How Web Attacks Work" },
  { lessonId: "lesson-3", title: "Core Security Concepts" },
  { lessonId: "lesson-4", title: "OWASP Top 10 Overview" },
  { lessonId: "lesson-5", title: "Using Vulnerable vs Secure Demos" },
];

const BeginnerLesson = () => {
  const { lessonId } = useParams();
  const { token } = useAuth();
  const [progress, setProgress] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverResult, setServerResult] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all([
      api.getBeginnerProgress(token).catch(() => ({ progress: null })),
      api.getLessonContent(lessonId, token).catch((e) => {
        setError("Failed to load lesson");
        return { content: null };
      }),
      api.getQuizResult(lessonId, token).catch(() => ({ result: null })),
    ])
      .then(([pr, lc, qr]) => {
        setProgress(pr.progress || null);
        setContent(lc.content || { lessonId, concepts: [], quizQuestions: [] });
        if (qr.result) {
          setAnswers(qr.result.answers || []);
          setSubmitted(!!qr.result.submitted);
          setServerResult(qr.result);
        }
      })
      .finally(() => setLoading(false));
  }, [token, lessonId]);

  useEffect(() => {
    const total = content?.quizQuestions?.length || 0;
    if (!answers || answers.length === 0) {
      setAnswers(Array(total).fill(null));
    }
    setFeedback(Array(total).fill(null));
  }, [content?.quizQuestions]);

  const pct = progress?.progressPercent || 0;

  const score = useMemo(() => {
    const q = content?.quizQuestions || [];
    let s = 0;
    for (let i = 0; i < q.length; i++) {
      if (answers[i] === q[i]?.a) s++;
    }
    return s;
  }, [answers, content?.quizQuestions]);

  const onSelect = (idx, opt) => {
    const a = [...answers];
    a[idx] = opt;
    setAnswers(a);
    if (submitted) {
      const q = content?.quizQuestions || [];
      const f = [...feedback];
      f[idx] = opt === q[idx]?.a ? "Correct" : "Try again";
      setFeedback(f);
    }
  };

  const onSubmitQuiz = async () => {
    setSubmitting(true);
    try {
      const r = await api.submitBeginnerQuiz(lessonId, answers, token);
      setServerResult(r.result || null);
      setSubmitted(true);
      const q = content?.quizQuestions || [];
      const f = [...feedback];
      for (let i = 0; i < q.length; i++) {
        const correct = q[i]?.a;
        const sel = answers[i];
        f[i] = sel === correct ? "Correct" : "Try again";
      }
      setFeedback(f);
    } finally {
      setSubmitting(false);
    }
  };

  const onMarkCompleted = async () => {
    const r = await api.completeBeginnerLesson(lessonId, token);
    setProgress(r.progress || progress);
  };

  const onResetQuiz = async () => {
    try {
      await api.resetQuiz(lessonId, token);
    } catch {}
    const total = content?.quizQuestions?.length || 0;
    setAnswers(Array(total).fill(null));
    setFeedback(Array(total).fill(null));
    setSubmitted(false);
    setServerResult(null);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-muted-foreground">Loading lesson...</p>
            </div>
          </div>
        </main>
      </div>
    );
  if (!content)
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-muted-foreground">Lesson not found</p>
              <Link to="/learn/beginner">
                <Button className="mt-4" variant="outline">
                  Back to Beginner Path
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {LESSONS.find((l) => l.lessonId === lessonId)?.title || "Lesson"}
            </h1>
            <div className="text-muted-foreground space-y-2">
              {(content.concepts || []).map((c, i) => (
                <div key={i}>{c}</div>
              ))}
            </div>
            
          </motion.div>
          <LessonIntro lessonId={lessonId} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-3">
                Example (Read-only)
              </h2>
              <CodeBlock
                language="javascript"
                type="vulnerable"
                explanation="Weak policy"
                code={`function allowAll(input){ return true }`}
              />
              <div className="mt-4" />
              <CodeBlock
                language="javascript"
                type="secure"
                explanation="Strong policy"
                code={`function validate(input){ return /^[a-z0-9_-]+$/i.test(input) }`}
              />
            </div>
            <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-3">Quiz</h2>
              <div className="space-y-6">
                {(content.quizQuestions || []).map((item, idx) => (
                  <div key={idx}>
                    <div className="font-medium mb-2">{item.q}</div>
                    <div className="space-y-2">
                      {item.options.map((opt, j) => (
                        <label
                          key={j}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="radio"
                            name={`q${idx}`}
                            checked={answers[idx] === j}
                            onChange={() => onSelect(idx, j)}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                    {submitted && feedback[idx] && (
                      <div
                        className={`text-xs mt-2 ${
                          feedback[idx] === "Correct"
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {feedback[idx]}
                      </div>
                    )}
                    {submitted && answers[idx] !== item.a && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Answer: {item.options[item.a]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm">
                  {submitted && serverResult
                    ? `Submitted: ${serverResult.score} / ${serverResult.total} (attempts: ${serverResult.attempts})`
                    : `Score: ${score} / ${
                        (content.quizQuestions || []).length
                      }`}
                </div>
                <div className="flex gap-2">
                  <Button onClick={onSubmitQuiz} disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Quiz"}
                  </Button>
                  <Button variant="outline" onClick={onResetQuiz}>
                    Reset Quiz
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onMarkCompleted}>
              Mark as Completed
            </Button>
            <Link to="/learn/beginner">
              <Button variant="outline">Back</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BeginnerLesson;
