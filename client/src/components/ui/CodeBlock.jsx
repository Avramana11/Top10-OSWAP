import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CodeBlock = ({ code, language, type, explanation }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isVulnerable = type === "vulnerable";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl overflow-hidden border"
      style={{
        borderColor: isVulnerable ? "hsl(var(--destructive) / 0.3)" : "hsl(var(--success) / 0.3)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{
          backgroundColor: isVulnerable ? "hsl(var(--destructive) / 0.1)" : "hsl(var(--success) / 0.1)",
          borderColor: isVulnerable ? "hsl(var(--destructive) / 0.2)" : "hsl(var(--success) / 0.2)",
        }}
      >
        <div className="flex items-center gap-2">
          {isVulnerable ? (
            <AlertCircle className="h-4 w-4 text-destructive" />
          ) : (
            <CheckCircle className="h-4 w-4 text-success" />
          )}
          <span className={`text-sm font-medium ${isVulnerable ? "text-destructive" : "text-success"}`}>
            {isVulnerable ? "Vulnerable Code" : "Secure Code"}
          </span>
          <span className="text-xs text-muted-foreground font-mono px-2 py-0.5 rounded bg-secondary">
            {language}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>

      {/* Code */}
      <div className="bg-muted/50 p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-foreground/90 whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </div>

      {/* Explanation */}
      <div
        className="px-4 py-3 border-t"
        style={{
          backgroundColor: isVulnerable ? "hsl(var(--destructive) / 0.05)" : "hsl(var(--success) / 0.05)",
          borderColor: isVulnerable ? "hsl(var(--destructive) / 0.1)" : "hsl(var(--success) / 0.1)",
        }}
      >
        <p className="text-sm text-muted-foreground">{explanation}</p>
      </div>
    </motion.div>
  );
};

export default CodeBlock;
