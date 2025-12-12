import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import VulnerabilityPreview from "@/components/home/VulnerabilityPreview";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "@/api/reviews";

const Index = () => {
  const { data } = useQuery({ queryKey: ["reviews:index"], queryFn: () => getReviews() });
  const reviews = (data?.reviews || []).slice(0, 6);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        <HeroSection />
        <FeaturesSection />
        <VulnerabilityPreview />
        
        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Become a <span className="text-gradient">Security Expert?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Start learning about web application security today. It's free, comprehensive, and designed for developers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/vulnerabilities">
                  <Button size="lg" className="glow-primary">
                    Start Learning Now
                  </Button>
                </Link>
                <a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Official OWASP Site
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              {/* <h2 className="text-2xl font-bold">Reviews</h2> */}
              <div className="w-full flex justify-center">
  <h2 className="text-3xl md:text-4xl font-bold text-gradient">Reviews</h2>
</div>

              <Link to="/reviews">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            {reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">No reviews yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map((r) => (
                  <div key={r._id} className="border rounded-2xl p-4 bg-card/50 hover:bg-card transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{r.name}</p>
                      <span className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-2 text-sm">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">
                  <span className="text-gradient">OWASP</span>
                  <span className="text-foreground ml-1">Learn</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Educational content based on OWASP Top 10 - 2021. Learn responsibly.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/OWASP" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
