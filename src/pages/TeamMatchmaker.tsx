import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  Users,
  Code,
  Palette,
  Database,
  Brain,
  Rocket,
  X,
  Check,
  Plus,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface TeamRequest {
  id: string;
  projectName: string;
  description: string;
  lookingFor: string[];
  teamLead: string;
  avatar: string;
  tags: string[];
  members: number;
  maxMembers: number;
}

const skillIcons: Record<string, typeof Code> = {
  Frontend: Code,
  Backend: Database,
  "UI/UX": Palette,
  "AI/ML": Brain,
  "Full Stack": Rocket,
};

const mockRequests: TeamRequest[] = [
  {
    id: "1",
    projectName: "EcoTrack AI",
    description: "Building an AI-powered carbon footprint tracker that helps users understand and reduce their environmental impact through personalized recommendations.",
    lookingFor: ["Frontend", "AI/ML"],
    teamLead: "Alex Chen",
    avatar: "AC",
    tags: ["React", "TensorFlow", "Sustainability"],
    members: 2,
    maxMembers: 4,
  },
  {
    id: "2",
    projectName: "Campus Connect",
    description: "A social platform for students to find study groups, share resources, and collaborate on assignments across departments.",
    lookingFor: ["Backend", "UI/UX"],
    teamLead: "Sarah Kim",
    avatar: "SK",
    tags: ["Node.js", "PostgreSQL", "Mobile"],
    members: 3,
    maxMembers: 5,
  },
  {
    id: "3",
    projectName: "Smart Library",
    description: "Revolutionizing library management with real-time book tracking, AI-powered recommendations, and seamless reservation system.",
    lookingFor: ["Full Stack", "UI/UX"],
    teamLead: "James Wilson",
    avatar: "JW",
    tags: ["Next.js", "MongoDB", "IoT"],
    members: 1,
    maxMembers: 3,
  },
  {
    id: "4",
    projectName: "HealthSync",
    description: "A comprehensive health monitoring dashboard that integrates with wearables and provides actionable insights for better wellness.",
    lookingFor: ["Frontend", "Backend"],
    teamLead: "Maya Patel",
    avatar: "MP",
    tags: ["Vue.js", "Python", "HealthTech"],
    members: 2,
    maxMembers: 4,
  },
];

export default function TeamMatchmaker() {
  const { toast } = useToast();
  const [requests, setRequests] = useState(mockRequests);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    lookingFor: "",
  });

  const currentRequest = requests[currentIndex];

  const handleSwipe = (swipeDirection: "left" | "right") => {
    setDirection(swipeDirection);

    if (swipeDirection === "right" && currentRequest) {
      toast({
        title: "Request sent! 🎉",
        description: `Your request to join "${currentRequest.projectName}" has been sent to ${currentRequest.teamLead}.`,
      });
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDirection(null);
    }, 300);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      handleSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  const handlePostProject = () => {
    if (!newProject.name || !newProject.description || !newProject.lookingFor) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Project posted! 🚀",
      description: "Your team request is now live for others to discover.",
    });

    setDialogOpen(false);
    setNewProject({ name: "", description: "", lookingFor: "" });
  };

  const resetCards = () => {
    setCurrentIndex(0);
    setRequests(mockRequests);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold">
                Team Matchmaker
              </h1>
              <p className="text-muted-foreground">
                Find your perfect project team
              </p>
            </div>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-eco hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Post Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">Post a Team Request</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="e.g., Green Campus App"
                    value={newProject.name}
                    onChange={(e) =>
                      setNewProject((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project and what you're building..."
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="mt-1.5 min-h-[100px]"
                  />
                </div>
                <div>
                  <Label htmlFor="looking-for">Looking For</Label>
                  <Input
                    id="looking-for"
                    placeholder="e.g., Frontend Dev, UI/UX Designer"
                    value={newProject.lookingFor}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        lookingFor: e.target.value,
                      }))
                    }
                    className="mt-1.5"
                  />
                </div>
                <Button onClick={handlePostProject} className="w-full bg-gradient-eco">
                  <Rocket className="w-4 h-4 mr-2" />
                  Post Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Swipe Cards */}
      <div className="relative h-[480px] mb-8">
        <AnimatePresence>
          {currentIndex < requests.length ? (
            <motion.div
              key={currentRequest.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
                rotate: direction === "left" ? -15 : direction === "right" ? 15 : 0,
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <div className="bento-card h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-eco flex items-center justify-center text-primary-foreground font-bold">
                      {currentRequest.avatar}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl">
                        {currentRequest.projectName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        by {currentRequest.teamLead}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted">
                    {currentRequest.members}/{currentRequest.maxMembers} members
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground flex-1">
                  {currentRequest.description}
                </p>

                {/* Looking For */}
                <div className="my-4">
                  <p className="text-sm font-medium mb-2">Looking for:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentRequest.lookingFor.map((skill) => {
                      const Icon = skillIcons[skill] || Code;
                      return (
                        <span
                          key={skill}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium"
                        >
                          <Icon className="w-4 h-4" />
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentRequest.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-lg bg-muted text-xs text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Swipe hint */}
                <div className="text-center text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    ← Swipe left to skip • Swipe right to join →
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <Users className="w-16 h-16 text-muted-foreground/20 mb-4" />
              <p className="text-muted-foreground mb-4">
                No more teams to discover
              </p>
              <Button onClick={resetCards} variant="outline">
                Start Over
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      {currentIndex < requests.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe("left")}
            className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors"
          >
            <X className="w-8 h-8 text-destructive" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-accent" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe("right")}
            className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center hover:bg-success/20 transition-colors"
          >
            <Check className="w-8 h-8 text-success" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
