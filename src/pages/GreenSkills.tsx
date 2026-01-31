import { useState } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Target,
  Calculator,
  Lightbulb,
  CheckCircle2,
  Lock,
  Play,
  Clock,
  Award,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface Module {
  id: string;
  title: string;
  description: string;
  icon: typeof Leaf;
  lessons: number;
  duration: string;
  progress: number;
  isLocked: boolean;
  badge?: string;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

const modules: Module[] = [
  {
    id: "net-zero",
    title: "Net Zero Foundations",
    description: "Understand the science and policy behind achieving net-zero emissions by 2050.",
    icon: Target,
    lessons: 8,
    duration: "2.5 hrs",
    progress: 75,
    isLocked: false,
    badge: "Climate Pioneer",
  },
  {
    id: "carbon-calc",
    title: "Carbon Footprint Calculation",
    description: "Learn to measure, analyze, and report carbon emissions across different scopes.",
    icon: Calculator,
    lessons: 6,
    duration: "2 hrs",
    progress: 45,
    isLocked: false,
  },
  {
    id: "green-tech",
    title: "Green Tech Trends",
    description: "Explore cutting-edge sustainable technologies reshaping industries worldwide.",
    icon: Lightbulb,
    lessons: 10,
    duration: "3 hrs",
    progress: 20,
    isLocked: false,
  },
  {
    id: "renewable",
    title: "Renewable Energy Systems",
    description: "Deep dive into solar, wind, hydro, and emerging renewable energy technologies.",
    icon: Zap,
    lessons: 12,
    duration: "4 hrs",
    progress: 0,
    isLocked: true,
  },
];

const currentLessons: Lesson[] = [
  { id: "1", title: "Introduction to Net Zero", duration: "15 min", completed: true },
  { id: "2", title: "The Paris Agreement", duration: "20 min", completed: true },
  { id: "3", title: "Carbon Offsetting vs Reduction", duration: "25 min", completed: true },
  { id: "4", title: "Corporate Net Zero Strategies", duration: "30 min", completed: false },
  { id: "5", title: "Government Policies", duration: "20 min", completed: false },
];

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

export default function GreenSkills() {
  const [selectedModule, setSelectedModule] = useState<string | null>("net-zero");
  const totalProgress = Math.round(
    modules.reduce((acc, m) => acc + m.progress, 0) / modules.length
  );

  const selectedModuleData = modules.find((m) => m.id === selectedModule);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-eco flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">
              <span className="text-gradient-eco">Green Skills</span> Engine
            </h1>
            <p className="text-muted-foreground">
              Build expertise for a sustainable future
            </p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bento-card-eco p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Your Sustainability Journey</span>
            <span className="text-sm text-primary font-semibold">{totalProgress}% Complete</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Award className="w-3 h-3 text-primary" />
              1 Badge Earned
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              8.5 hrs completed
            </span>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Modules List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-1 space-y-4"
        >
          {modules.map((module) => {
            const Icon = module.icon;
            const isSelected = selectedModule === module.id;

            return (
              <motion.div
                key={module.id}
                variants={itemVariants}
                whileHover={!module.isLocked ? { scale: 1.02 } : {}}
                onClick={() => !module.isLocked && setSelectedModule(module.id)}
                className={`bento-card cursor-pointer transition-all ${
                  isSelected ? "ring-2 ring-primary shadow-eco" : ""
                } ${module.isLocked ? "opacity-60" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      module.isLocked
                        ? "bg-muted"
                        : isSelected
                        ? "bg-gradient-eco text-primary-foreground"
                        : "bg-primary/10"
                    }`}
                  >
                    {module.isLocked ? (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Icon
                        className={`w-5 h-5 ${
                          isSelected ? "text-primary-foreground" : "text-primary"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-sm">
                      {module.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {module.lessons} lessons • {module.duration}
                    </p>
                    {!module.isLocked && (
                      <div className="mt-2">
                        <Progress value={module.progress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                  {module.badge && module.progress >= 75 && (
                    <Award className="w-5 h-5 text-warning flex-shrink-0" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Module Detail */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          {selectedModuleData && (
            <div className="bento-card">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-eco flex items-center justify-center">
                  <selectedModuleData.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display font-bold text-xl">
                    {selectedModuleData.title}
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    {selectedModuleData.description}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6 p-4 rounded-xl bg-primary/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Module Progress</span>
                  <span className="text-sm text-primary font-semibold">
                    {selectedModuleData.progress}%
                  </span>
                </div>
                <Progress value={selectedModuleData.progress} className="h-2" />
              </div>

              {/* Lessons */}
              <div>
                <h3 className="font-display font-semibold mb-4">Lessons</h3>
                <div className="space-y-2">
                  {currentLessons.map((lesson, index) => (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                        lesson.completed
                          ? "bg-success/5"
                          : index === currentLessons.findIndex((l) => !l.completed)
                          ? "bg-primary/5 ring-1 ring-primary/20"
                          : "bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            lesson.completed
                              ? "bg-success text-success-foreground"
                              : "bg-muted"
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <span className="text-sm font-medium text-muted-foreground">
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <div>
                          <p
                            className={`font-medium text-sm ${
                              lesson.completed ? "text-muted-foreground" : ""
                            }`}
                          >
                            {lesson.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lesson.duration}
                          </p>
                        </div>
                      </div>
                      {!lesson.completed &&
                        index === currentLessons.findIndex((l) => !l.completed) && (
                          <Button size="sm" className="bg-gradient-eco hover:opacity-90">
                            <Play className="w-4 h-4 mr-1" />
                            Start
                          </Button>
                        )}
                      {lesson.completed && (
                        <Button variant="ghost" size="sm">
                          Review
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Badge Preview */}
              {selectedModuleData.badge && (
                <div className="mt-6 p-4 rounded-xl bg-warning/5 border border-warning/20">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-warning" />
                    <div>
                      <p className="font-medium text-sm">
                        Complete to earn: {selectedModuleData.badge}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {100 - selectedModuleData.progress}% remaining
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
