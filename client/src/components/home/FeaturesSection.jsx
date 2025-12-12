import { motion } from "framer-motion";
import { Code2, Shield, BookOpen, Zap, Users, Award } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Code Examples",
    description: "Real vulnerable and secure code samples in JavaScript, Python, and more.",
    color: "text-primary",
  },
  {
    icon: Shield,
    title: "Prevention Methods",
    description: "Learn best practices and security controls to protect your applications.",
    color: "text-success",
  },
  {
    icon: BookOpen,
    title: "Beginner Friendly",
    description: "Clear explanations designed for students and developers new to security.",
    color: "text-warning",
  },
  {
    icon: Zap,
    title: "Interactive Learning",
    description: "Test your knowledge with quizzes and hands-on exercises.",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Real-World Cases",
    description: "Learn from actual security breaches and how they could have been prevented.",
    color: "text-destructive",
  },
  {
    icon: Award,
    title: "Track Progress",
    description: "Earn certificates and track your learning journey through each vulnerability.",
    color: "text-success",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
            Learn Security <span className="text-gradient">The Right Way</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto">
            Everything you need to understand and prevent the most critical web security vulnerabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 sm:gap-6 xl:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative p-4 sm:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300">
                <div className={`inline-flex p-3 rounded-xl bg-secondary ${feature.color} mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm xl:text-base">{feature.description}</p>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-primary/5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
