import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, BookOpen, Code, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial" />
      
      {/* Animated scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan-line" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
              <Shield className="h-4 w-4" />
              OWASP Top 10 - 2021 Edition
            </span>
          </motion.div>

          {/* Main Heading */}
          {/* <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6"
          >
            Master{" "}
            <span className="text-gradient">Web Security</span>
            <br />
            <span className="text-muted-foreground">One Vulnerability at a Time</span>
          </motion.h1> */}
          {/* Main Heading with Image on Left */}
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6 w-full"
>
  {/* Title LEFT */}
  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-center sm:text-left max-w-3xl">
    Master <span className="text-gradient">Web Security</span>
    <br />
    <span className="text-muted-foreground">One Vulnerability at a Time</span>
  </h1>

  {/* Image RIGHT - BIG on large screens */}
  <img
    src="/Home.png"
    alt="Cyber Threat"
    className="
      w-40 h-40 
      md:w-60 md:h-60 
      lg:w-80 lg:h-80 
      xl:w-[420px] xl:h-[420px]
      object-contain drop-shadow-xl
    "
  />
</motion.div>




          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Learn the most critical web application security risks with hands-on examples, 
            vulnerable code samples, and secure coding practices.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link to="/vulnerabilities">
            <Button size="lg" className="glow-primary text-sm sm:text-base group">
                <BookOpen className="mr-2 h-5 w-5" />
                Learn Vulnerabilities
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/learn">
            <Button size="lg" variant="outline" className="text-sm sm:text-base border-primary/30 hover:bg-primary/10">
                <Code className="mr-2 h-5 w-5" />
                Start Secure Coding
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 md:gap-12 xl:gap-16 mt-12 md:mt-16 pt-12 md:pt-16 border-t border-border/50"
          >
            {[
              { value: "10", label: "Vulnerabilities" },
              { value: "50+", label: "Code Examples" },
              { value: "100%", label: "Free & Open" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 hidden lg:block"
      >
        <div className="w-20 h-20 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm flex items-center justify-center">
          {/* <span className="text-4xl">🔒</span> */}
          <img src = "/cyber-threat.png" alt = "cyber treat" className = "w-12 h-12"/>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-10 hidden lg:block"
      >
        <div className="w-20 h-20 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm flex items-center justify-center">
          <img src = "/icons8-shielding-48.png" alt = "cyber treat" className = "w-12 h-12"/>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
