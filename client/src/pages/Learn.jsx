import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Code, Shield, Award, ArrowRight, Lock } from "lucide-react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";

const learningPaths = [
  {
    title: "Beginner Path",
    description: "Start your security journey with the fundamentals of web application security.",
    icon: BookOpen,
    modules: ["What is OWASP?", "Understanding Web Security", "Common Attack Vectors"],
    progress: 0,
    available: true,
  },
  {
    title: "Code Review",
    description: "Learn to identify vulnerabilities in code through hands-on examples.",
    icon: Code,
    modules: ["SQL Injection Patterns", "XSS Detection", "Auth Vulnerabilities"],
    progress: 0,
    available: true,
  },
  {
    title: "Defense Strategies",
    description: "Master techniques to protect applications from common attacks.",
    icon: Shield,
    modules: ["Input Validation", "Authentication Best Practices", "Secure Headers"],
    progress: 0,
    available: true,
  },
  {
    title: "Certification Prep",
    description: "Prepare for security certifications with comprehensive practice tests.",
    icon: Award,
    modules: ["Practice Quizzes", "Mock Exams", "Study Guides"],
    progress: 0,
    available: false,
  },
];

const Learn = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Learning Paths</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Structured courses to help you master web application security at your own pace.
            </p>
          </motion.div>

          {/* Learning Paths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`relative h-full p-6 rounded-2xl border ${path.available ? 'border-border/50 bg-card/50' : 'border-border/30 bg-card/30'} backdrop-blur-sm transition-all duration-300 ${path.available ? 'hover:border-primary/30 hover:bg-card' : ''}`}>
                  {!path.available && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium">
                        <Lock className="h-3 w-3" />
                        Coming Soon
                      </span>
                    </div>
                  )}

                  <div className={`inline-flex p-3 rounded-xl ${path.available ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'} mb-4`}>
                    <path.icon className="h-6 w-6" />
                  </div>

                  <h3 className={`text-xl font-bold mb-2 ${!path.available && 'text-muted-foreground'}`}>
                    {path.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{path.description}</p>

                  <div className="space-y-2 mb-6">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Modules</span>
                    <ul className="space-y-1">
                      {path.modules.map((module, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                          {module}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {path.available ? (
                    <Link to={path.title === 'Beginner Path' ? '/learn/beginner' : path.title === 'Code Review' ? '/learn/code-review' : '/learn'} className="w-full">
                      <Button className="w-full group" variant="outline">
                        Start Learning
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  ) : (
                    <Button className="w-full" variant="outline" disabled>
                      Coming Soon
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Start */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <div className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">
                Not sure where to start?
              </h2>
              <p className="text-muted-foreground mb-6">
                Dive straight into the OWASP Top 10 vulnerabilities and learn by exploring real examples.
              </p>
              <Link to="/vulnerabilities">
                <Button size="lg" className="glow-primary group">
                  <Shield className="mr-2 h-5 w-5" />
                  Explore Vulnerabilities
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default Learn;
