import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  variant?: "default" | "eco" | "tech";
}

export function StatCard({
  label,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  variant = "default",
}: StatCardProps) {
  const iconBgColors = {
    default: "bg-muted",
    eco: "bg-primary/10",
    tech: "bg-accent/10",
  };

  const iconColors = {
    default: "text-muted-foreground",
    eco: "text-primary",
    tech: "text-accent",
  };

  const changeColors = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bento-card p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        {Icon && (
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            iconBgColors[variant]
          )}>
            <Icon className={cn("w-4 h-4", iconColors[variant])} />
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-display font-bold">{value}</span>
        {change && (
          <span className={cn("text-xs font-medium pb-1", changeColors[changeType])}>
            {change}
          </span>
        )}
      </div>
    </motion.div>
  );
}
