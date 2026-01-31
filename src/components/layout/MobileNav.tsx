import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Printer,
  Bus,
  BookOpen,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { path: "/", icon: LayoutDashboard, label: "Home" },
  { path: "/xerox", icon: Printer, label: "Xerox" },
  { path: "/bus-tracker", icon: Bus, label: "Bus" },
  { path: "/notes", icon: BookOpen, label: "Notes" },
  { path: "/green-skills", icon: Leaf, label: "Green" },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border">
      <div className="flex items-center justify-around py-2 px-2">
        {mobileNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          const isGreen = item.path.includes("green");

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center gap-1 px-3 py-2 min-w-[60px]"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className={cn(
                    "absolute inset-0 rounded-xl",
                    isGreen ? "bg-primary/10" : "bg-primary/10"
                  )}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <Icon
                className={cn(
                  "w-5 h-5 relative z-10 transition-colors",
                  isActive
                    ? isGreen
                      ? "text-primary"
                      : "text-primary"
                    : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium relative z-10 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
