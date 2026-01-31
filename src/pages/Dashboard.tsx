import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Printer,
  Bus,
  MessageSquareWarning,
  BookOpen,
  Users,
  Leaf,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { BentoCard } from "@/components/dashboard/BentoCard";
import { StatCard } from "@/components/dashboard/StatCard";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          Welcome back, <span className="text-gradient-eco">Student</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Your campus life, simplified. Here's what's happening today.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <motion.div variants={itemVariants}>
          <StatCard
            label="Print Requests"
            value={3}
            change="+2 today"
            changeType="neutral"
            icon={Printer}
            variant="default"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            label="Next Bus"
            value="5 min"
            icon={Bus}
            variant="tech"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            label="New Notes"
            value={7}
            change="+3 new"
            changeType="positive"
            icon={BookOpen}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            label="Green Score"
            value="85%"
            change="+5%"
            changeType="positive"
            icon={Leaf}
            variant="eco"
          />
        </motion.div>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {/* Xerox Hub */}
        <motion.div variants={itemVariants}>
          <BentoCard
            title="Xerox Hub"
            description="Print documents easily"
            icon={Printer}
            variant="default"
            onClick={() => navigate("/xerox")}
          >
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-warning" />
                  <span>Assignment.pdf</span>
                </span>
                <span className="status-queue">In Queue</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Notes_Ch5.pdf</span>
                </span>
                <span className="status-ready">Ready</span>
              </div>
            </div>
          </BentoCard>
        </motion.div>

        {/* Bus Tracker */}
        <motion.div variants={itemVariants}>
          <BentoCard
            title="Live Bus Tracker"
            description="Real-time campus shuttles"
            icon={Bus}
            variant="tech"
            onClick={() => navigate("/bus-tracker")}
          >
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                  <span className="font-medium">Shuttle A</span>
                </div>
                <span className="text-accent font-semibold">5 min</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning animate-pulse" />
                  <span className="font-medium">Shuttle B</span>
                </div>
                <span className="text-muted-foreground">12 min</span>
              </div>
            </div>
          </BentoCard>
        </motion.div>

        {/* Complaints */}
        <motion.div variants={itemVariants}>
          <BentoCard
            title="Complaints Box"
            description="Report issues with AI priority"
            icon={MessageSquareWarning}
            variant="default"
            onClick={() => navigate("/complaints")}
          >
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span>2 pending complaints</span>
            </div>
          </BentoCard>
        </motion.div>

        {/* Faculty Notes - Spans 2 columns on large screens */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <BentoCard
            title="Faculty Notes Portal"
            description="Latest uploads from your professors"
            icon={BookOpen}
            variant="eco"
            onClick={() => navigate("/notes")}
          >
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { subject: "Data Structures", prof: "Dr. Smith", time: "2h ago" },
                { subject: "Machine Learning", prof: "Prof. Johnson", time: "5h ago" },
                { subject: "Environmental Science", prof: "Dr. Green", time: "1d ago" },
                { subject: "Web Development", prof: "Ms. Chen", time: "2d ago" },
              ].map((note, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-background/50">
                  <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{note.subject}</p>
                    <p className="text-xs text-muted-foreground">{note.prof} • {note.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
        </motion.div>

        {/* Team Matchmaker */}
        <motion.div variants={itemVariants}>
          <BentoCard
            title="Team Matchmaker"
            description="Find your dream team"
            icon={Users}
            variant="default"
            onClick={() => navigate("/team-matchmaker")}
          >
            <div className="mt-4 text-sm">
              <p className="text-muted-foreground">Active requests:</p>
              <p className="font-semibold text-2xl mt-1">12</p>
            </div>
          </BentoCard>
        </motion.div>

        {/* Green Skills - Featured */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <BentoCard
            title="Green Skills Engine"
            description="Build a sustainable future with cutting-edge knowledge"
            icon={Leaf}
            variant="featured"
            size="lg"
            onClick={() => navigate("/green-skills")}
          >
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: "Net Zero", progress: 75 },
                { label: "Carbon Calc", progress: 45 },
                { label: "Green Tech", progress: 20 },
              ].map((course, i) => (
                <div key={i}>
                  <p className="text-xs text-primary-foreground/70 mb-2">{course.label}</p>
                  <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className="h-full bg-primary-foreground rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
        </motion.div>

        {/* Green Careers */}
        <motion.div variants={itemVariants}>
          <BentoCard
            title="Green Careers"
            description="Sustainable job opportunities"
            icon={Briefcase}
            variant="eco"
            onClick={() => navigate("/green-careers")}
          >
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">15 new listings</span>
            </div>
          </BentoCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
