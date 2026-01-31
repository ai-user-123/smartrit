import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Download,
  FileText,
  Calendar,
  User,
  Search,
  Filter,
  Bell,
  Eye,
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

interface Note {
  id: string;
  title: string;
  subject: string;
  professor: string;
  uploadedAt: Date;
  fileSize: string;
  downloads: number;
  isNew: boolean;
}

const subjects = [
  "All Subjects",
  "Data Structures",
  "Machine Learning",
  "Environmental Science",
  "Web Development",
  "Database Management",
  "Computer Networks",
];

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Chapter 5: Binary Trees and BST",
    subject: "Data Structures",
    professor: "Dr. Smith",
    uploadedAt: new Date(Date.now() - 7200000),
    fileSize: "2.4 MB",
    downloads: 45,
    isNew: true,
  },
  {
    id: "2",
    title: "Neural Networks Introduction",
    subject: "Machine Learning",
    professor: "Prof. Johnson",
    uploadedAt: new Date(Date.now() - 18000000),
    fileSize: "5.1 MB",
    downloads: 78,
    isNew: true,
  },
  {
    id: "3",
    title: "Climate Change & Sustainability",
    subject: "Environmental Science",
    professor: "Dr. Green",
    uploadedAt: new Date(Date.now() - 86400000),
    fileSize: "3.8 MB",
    downloads: 92,
    isNew: false,
  },
  {
    id: "4",
    title: "React Hooks Deep Dive",
    subject: "Web Development",
    professor: "Ms. Chen",
    uploadedAt: new Date(Date.now() - 172800000),
    fileSize: "1.9 MB",
    downloads: 156,
    isNew: false,
  },
  {
    id: "5",
    title: "SQL Optimization Techniques",
    subject: "Database Management",
    professor: "Dr. Kumar",
    uploadedAt: new Date(Date.now() - 259200000),
    fileSize: "2.7 MB",
    downloads: 67,
    isNew: false,
  },
  {
    id: "6",
    title: "TCP/IP Protocol Suite",
    subject: "Computer Networks",
    professor: "Prof. Williams",
    uploadedAt: new Date(Date.now() - 345600000),
    fileSize: "4.2 MB",
    downloads: 89,
    isNew: false,
  },
];

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function FacultyNotes() {
  const { toast } = useToast();
  const [notes, setNotes] = useState(mockNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [notificationShown, setNotificationShown] = useState(false);

  // Simulate new note notification
  useEffect(() => {
    if (!notificationShown) {
      const timer = setTimeout(() => {
        toast({
          title: "📚 New notes uploaded!",
          description: "Dr. Smith just uploaded 'Advanced Graph Algorithms'",
        });
        setNotificationShown(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notificationShown, toast]);

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.professor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "All Subjects" || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleDownload = (note: Note) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === note.id ? { ...n, downloads: n.downloads + 1, isNew: false } : n
      )
    );
    toast({
      title: "Download started",
      description: `${note.title} is being downloaded.`,
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">
              Faculty Notes Portal
            </h1>
            <p className="text-muted-foreground">
              Access lecture materials from your professors
            </p>
          </div>
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
            placeholder="Search notes or professors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* New Notes Badge */}
      {notes.some((n) => n.isNew) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">
              {notes.filter((n) => n.isNew).length} new notes available
            </p>
            <p className="text-xs text-muted-foreground">
              Recently uploaded by your professors
            </p>
          </div>
        </motion.div>
      )}

      {/* Notes Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className={`bento-card group ${note.isNew ? "ring-2 ring-primary/30" : ""}`}
            >
              {note.isNew && (
                <div className="absolute top-4 right-4">
                  <span className="status-badge bg-primary/10 text-primary">
                    New
                  </span>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-base line-clamp-1 pr-16">
                    {note.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mt-0.5">
                    {note.subject}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {note.professor}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatTimeAgo(note.uploadedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {note.downloads} downloads
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {note.fileSize}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(note)}
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" />
          <p className="text-muted-foreground">No notes found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
