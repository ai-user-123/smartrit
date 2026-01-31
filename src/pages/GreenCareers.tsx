import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Filter,
  Search,
  Leaf,
  Zap,
  Recycle,
  TreePine,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "internship" | "part-time";
  salary: string;
  category: "renewable" | "esg" | "sustainability" | "conservation";
  description: string;
  tags: string[];
  postedAt: Date;
  isSaved: boolean;
  logo: string;
}

const categoryConfig = {
  renewable: { label: "Renewable Energy", icon: Zap, color: "text-warning" },
  esg: { label: "ESG", icon: Building2, color: "text-accent" },
  sustainability: { label: "Sustainability", icon: Leaf, color: "text-primary" },
  conservation: { label: "Conservation", icon: TreePine, color: "text-success" },
};

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Solar Energy Systems Intern",
    company: "SunPower Solutions",
    location: "San Francisco, CA",
    type: "internship",
    salary: "$25-30/hr",
    category: "renewable",
    description: "Join our team to design and implement cutting-edge solar energy systems for commercial buildings.",
    tags: ["Solar", "Engineering", "AutoCAD"],
    postedAt: new Date(Date.now() - 86400000),
    isSaved: false,
    logo: "SP",
  },
  {
    id: "2",
    title: "ESG Analyst",
    company: "GreenFinance Corp",
    location: "New York, NY",
    type: "full-time",
    salary: "$75-95k",
    category: "esg",
    description: "Analyze and report on environmental, social, and governance metrics for investment portfolios.",
    tags: ["Finance", "Analytics", "Reporting"],
    postedAt: new Date(Date.now() - 172800000),
    isSaved: true,
    logo: "GF",
  },
  {
    id: "3",
    title: "Sustainability Coordinator",
    company: "EcoTech Industries",
    location: "Austin, TX",
    type: "full-time",
    salary: "$65-80k",
    category: "sustainability",
    description: "Lead sustainability initiatives and drive carbon reduction programs across our manufacturing facilities.",
    tags: ["Project Management", "Carbon Accounting", "Leadership"],
    postedAt: new Date(Date.now() - 259200000),
    isSaved: false,
    logo: "ET",
  },
  {
    id: "4",
    title: "Wind Farm Technician Trainee",
    company: "WindForce Energy",
    location: "Denver, CO",
    type: "internship",
    salary: "$22-28/hr",
    category: "renewable",
    description: "Train to maintain and repair wind turbines while learning about renewable energy infrastructure.",
    tags: ["Wind Energy", "Maintenance", "Safety"],
    postedAt: new Date(Date.now() - 345600000),
    isSaved: false,
    logo: "WF",
  },
  {
    id: "5",
    title: "Conservation Data Scientist",
    company: "Wildlife Protection Fund",
    location: "Remote",
    type: "full-time",
    salary: "$85-110k",
    category: "conservation",
    description: "Use AI and machine learning to analyze wildlife data and inform conservation strategies.",
    tags: ["Python", "Machine Learning", "GIS"],
    postedAt: new Date(Date.now() - 432000000),
    isSaved: false,
    logo: "WP",
  },
  {
    id: "6",
    title: "Carbon Markets Analyst",
    company: "ClimateEx",
    location: "Chicago, IL",
    type: "full-time",
    salary: "$70-90k",
    category: "esg",
    description: "Analyze carbon credit markets and develop trading strategies for our institutional clients.",
    tags: ["Trading", "Carbon Markets", "Research"],
    postedAt: new Date(Date.now() - 518400000),
    isSaved: true,
    logo: "CX",
  },
];

export default function GreenCareers() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    const matchesCategory =
      categoryFilter === "all" || job.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const toggleSave = (jobId: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
      )
    );
    const job = jobs.find((j) => j.id === jobId);
    toast({
      title: job?.isSaved ? "Removed from saved" : "Saved to your list",
      description: job?.title,
    });
  };

  const formatDate = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-eco flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">
              <span className="text-gradient-eco">Green</span> Careers
            </h1>
            <p className="text-muted-foreground">
              Opportunities in sustainability & clean energy
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(categoryConfig).map(([key, config]) => {
            const count = jobs.filter((j) => j.category === key).length;
            const Icon = config.icon;
            return (
              <div key={key} className="bento-card p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${config.color}`} />
                  <span className="text-xs text-muted-foreground">
                    {config.label}
                  </span>
                </div>
                <p className="text-2xl font-display font-bold">{count}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs, companies, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="renewable">Renewable Energy</SelectItem>
            <SelectItem value="esg">ESG</SelectItem>
            <SelectItem value="sustainability">Sustainability</SelectItem>
            <SelectItem value="conservation">Conservation</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Jobs List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredJobs.map((job, index) => {
            const categoryInfo = categoryConfig[job.category];
            const CategoryIcon = categoryInfo.icon;

            return (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bento-card group hover:shadow-eco"
              >
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-eco flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
                    {job.logo}
                  </div>

                  {/* Job Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-primary font-medium">{job.company}</p>
                      </div>
                      <button
                        onClick={() => toggleSave(job.id)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        {job.isSaved ? (
                          <BookmarkCheck className="w-5 h-5 text-primary" />
                        ) : (
                          <Bookmark className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                    </div>

                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(job.postedAt)}
                      </span>
                      <span
                        className={`flex items-center gap-1 ${categoryInfo.color}`}
                      >
                        <CategoryIcon className="w-4 h-4" />
                        {categoryInfo.label}
                      </span>
                    </div>

                    {/* Tags & Actions */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-lg bg-muted text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        <span
                          className={`px-2 py-1 rounded-lg text-xs ${
                            job.type === "internship"
                              ? "bg-warning/10 text-warning"
                              : job.type === "full-time"
                              ? "bg-success/10 text-success"
                              : "bg-accent/10 text-accent"
                          }`}
                        >
                          {job.type}
                        </span>
                      </div>
                      <Button size="sm" className="bg-gradient-eco hover:opacity-90">
                        Apply
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-16">
          <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" />
          <p className="text-muted-foreground">
            No jobs found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}
