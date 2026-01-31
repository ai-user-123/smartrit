import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquareWarning,
  Send,
  AlertTriangle,
  Shield,
  Wrench,
  HelpCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "resolved";
  timestamp: Date;
}

const categories = [
  { value: "safety", label: "Safety Concern", icon: Shield },
  { value: "facilities", label: "Broken Facilities", icon: Wrench },
  { value: "academic", label: "Academic Issue", icon: HelpCircle },
  { value: "other", label: "Other", icon: MessageSquareWarning },
];

const priorityConfig = {
  high: { label: "High Priority", className: "priority-high bg-destructive/5" },
  medium: { label: "Medium Priority", className: "priority-medium bg-warning/5" },
  low: { label: "Low Priority", className: "priority-low bg-primary/5" },
};

// AI-powered urgency scoring keywords
const highPriorityKeywords = [
  "safety",
  "emergency",
  "fire",
  "flood",
  "broken",
  "dangerous",
  "injury",
  "urgent",
  "hazard",
  "electric",
  "water leak",
  "gas",
  "accident",
  "threat",
  "security",
];

function calculateUrgency(
  title: string,
  description: string,
  category: string
): "high" | "medium" | "low" {
  const text = `${title} ${description}`.toLowerCase();

  // High priority for safety or facilities with urgent keywords
  if (category === "safety") return "high";
  if (
    category === "facilities" &&
    highPriorityKeywords.some((keyword) => text.includes(keyword))
  ) {
    return "high";
  }
  if (highPriorityKeywords.some((keyword) => text.includes(keyword))) {
    return "high";
  }

  // Medium for facilities issues
  if (category === "facilities") return "medium";

  return "low";
}

export default function Complaints() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: "1",
      title: "Water leak in Building C",
      description: "There's a significant water leak in the second floor bathroom.",
      category: "facilities",
      priority: "high",
      status: "in-progress",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "2",
      title: "Library AC not working",
      description: "The air conditioning in the main library has been off for 2 days.",
      category: "facilities",
      priority: "medium",
      status: "pending",
      timestamp: new Date(Date.now() - 172800000),
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const priority = calculateUrgency(title, description, category);

    const newComplaint: Complaint = {
      id: Date.now().toString(),
      title,
      description,
      category,
      priority,
      status: "pending",
      timestamp: new Date(),
    };

    setComplaints((prev) => [newComplaint, ...prev]);
    setTitle("");
    setDescription("");
    setCategory("");
    setIsSubmitting(false);

    toast({
      title: priority === "high" ? "🚨 High Priority Alert!" : "Complaint submitted",
      description:
        priority === "high"
          ? "Your complaint has been flagged for immediate attention."
          : "Your complaint has been recorded and will be reviewed.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-warning/10 flex items-center justify-center">
            <MessageSquareWarning className="w-6 h-6 text-warning" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">
              Complaints Box
            </h1>
            <p className="text-muted-foreground">
              AI-powered priority scoring for faster resolution
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit} className="bento-card">
            <h2 className="font-display font-semibold text-lg mb-4">
              Submit a Grievance
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Brief summary of your complaint"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center gap-2">
                          <cat.icon className="w-4 h-4" />
                          {cat.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1.5 min-h-[120px]"
                />
              </div>

              {/* AI Urgency Preview */}
              {title && description && category && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-3 rounded-xl bg-muted/50"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="text-muted-foreground">AI Urgency Score:</span>
                    <span
                      className={`font-semibold ${
                        calculateUrgency(title, description, category) === "high"
                          ? "text-destructive"
                          : calculateUrgency(title, description, category) === "medium"
                          ? "text-warning"
                          : "text-primary"
                      }`}
                    >
                      {calculateUrgency(title, description, category).toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-eco hover:opacity-90"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Submitting..." : "Submit Complaint"}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Complaints List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <div className="bento-card">
            <h2 className="font-display font-semibold text-lg mb-4">
              Your Complaints
            </h2>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {complaints.map((complaint) => {
                  const priorityInfo = priorityConfig[complaint.priority];
                  const categoryInfo = categories.find(
                    (c) => c.value === complaint.category
                  );
                  const CategoryIcon = categoryInfo?.icon || MessageSquareWarning;

                  return (
                    <motion.div
                      key={complaint.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`p-4 rounded-xl ${priorityInfo.className}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="w-4 h-4 text-muted-foreground" />
                          <h3 className="font-medium">{complaint.title}</h3>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            complaint.status === "resolved"
                              ? "bg-success/10 text-success"
                              : complaint.status === "in-progress"
                              ? "bg-accent/10 text-accent"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {complaint.status === "resolved" && (
                            <CheckCircle2 className="w-3 h-3 inline mr-1" />
                          )}
                          {complaint.status === "in-progress" && (
                            <Clock className="w-3 h-3 inline mr-1" />
                          )}
                          {complaint.status.replace("-", " ")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {complaint.description}
                      </p>
                      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                        <span>{priorityInfo.label}</span>
                        <span>
                          {complaint.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {complaints.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquareWarning className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No complaints submitted yet</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
