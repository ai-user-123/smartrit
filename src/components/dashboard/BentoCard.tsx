import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  variant?: "default" | "eco" | "tech" | "featured";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function BentoCard({
  title,
  description,
  icon: Icon,
  variant = "default",
  size = "md",
  className,
  children,
  onClick,
}: BentoCardProps) {
  const variants = {
    default: "bento-card",
    eco: "bento-card-eco",
    tech: "bento-card-tech",
    featured: "bento-card bg-gradient-eco text-primary-foreground",
  };

  const sizes = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn(
        variants[variant],
        sizes[size],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className={cn(
            "font-display font-semibold",
            size === "lg" ? "text-xl" : "text-base"
          )}>
            {title}
          </h3>
          {description && (
            <p className={cn(
              "mt-1",
              variant === "featured" ? "text-primary-foreground/80" : "text-muted-foreground",
              size === "sm" ? "text-xs" : "text-sm"
            )}>
              {description}
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
            variant === "featured" ? "bg-primary-foreground/20" : 
            variant === "eco" ? "bg-primary/10" :
            variant === "tech" ? "bg-accent/10" : "bg-muted"
          )}>
            <Icon className={cn(
              "w-5 h-5",
              variant === "featured" ? "text-primary-foreground" :
              variant === "eco" ? "text-primary" :
              variant === "tech" ? "text-accent" : "text-muted-foreground"
            )} />
          </div>
        )}
      </div>
      {children}
    </motion.div>
  );
}
