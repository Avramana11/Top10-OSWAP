import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import Header from "@/components/layout/Header";
import VulnerabilityCard from "@/components/vulnerability/VulnerabilityCard";
import { vulnerabilities } from "@/data/vulnerabilities";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Vulnerabilities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("all");

  const severityFilters = [
    { value: "all", label: "All", color: "bg-secondary" },
    { value: "critical", label: "Critical", color: "bg-severity-critical" },
    { value: "high", label: "High", color: "bg-severity-high" },
    { value: "medium", label: "Medium", color: "bg-severity-medium" },
    { value: "low", label: "Low", color: "bg-severity-low" },
  ];

  const filteredVulnerabilities = vulnerabilities.filter((vuln) => {
    const matchesSearch = 
      vuln.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vuln.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vuln.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = selectedSeverity === "all" || vuln.severity === selectedSeverity;
    
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="text-gradient">OWASP Top 10</span> Vulnerabilities
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the most critical security risks to web applications. Click on any vulnerability to learn more.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-center justify-between p-3 sm:p-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
              {/* Search */}
              <div className="relative w-full md:w-[28rem]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vulnerabilities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border/50 focus:border-primary"
                />
              </div>

              {/* Severity Filters */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Filter className="h-4 w-4 text-muted-foreground mr-1" />
                {severityFilters.map((filter) => (
                  <Button
                    key={filter.value}
                    variant={selectedSeverity === filter.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSeverity(filter.value)}
                    className={
                      selectedSeverity === filter.value
                        ? `${filter.color} text-white border-transparent`
                        : "border-border/50 hover:bg-secondary"
                    }
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground mb-6"
          >
            Showing {filteredVulnerabilities.length} of {vulnerabilities.length} vulnerabilities
          </motion.p>

          {/* Vulnerability Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredVulnerabilities.map((vulnerability, index) => (
              <VulnerabilityCard
                key={vulnerability.id}
                vulnerability={vulnerability}
                index={index}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredVulnerabilities.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">No vulnerabilities match your search criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSeverity("all");
                }}
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Vulnerabilities;
