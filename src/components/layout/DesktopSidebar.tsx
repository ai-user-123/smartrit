import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Printer,
  Bus,
  MessageSquareWarning,
  BookOpen,
  Users,
  Leaf,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Sprout,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DesktopSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard", category: "main" },
  { path: "/xerox", icon: Printer, label: "Xerox Hub", category: "logistics" },
  { path: "/bus-tracker", icon: Bus, label: "Bus Tracker", category: "logistics" },
  { path: "/complaints", icon: MessageSquareWarning, label: "Complaints", category: "logistics" },
  { path: "/notes", icon: BookOpen, label: "Faculty Notes", category: "academic" },
  { path: "/team-matchmaker", icon: Users, label: "Team Finder", category: "academic" },
  { path: "/green-skills", icon: Leaf, label: "Green Skills", category: "green" },
  { path: "/green-careers", icon: Briefcase, label: "Green Careers", category: "green" },
];

export function DesktopSidebar({ collapsed, onToggle }: DesktopSidebarProps) {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-eco flex items-center justify-center flex-shrink-0">
            <Sprout className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-hidden"
            >
              <h1 className="font-display font-bold text-lg text-foreground">
                Campus Nexus
              </h1>
              <p className="text-xs text-muted-foreground">Student Portal</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          const isGreen = item.category === "green";

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? isGreen
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors",
                  isActive && isGreen && "text-primary-foreground"
                )}
              />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium text-sm whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
