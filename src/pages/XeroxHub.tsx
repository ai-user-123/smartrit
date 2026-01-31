import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Printer,
  Upload,
  FileText,
  Clock,
  Loader2,
  CheckCircle2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

type PrintStatus = "queue" | "printing" | "ready";

interface PrintRequest {
  id: string;
  fileName: string;
  colorMode: "color" | "bw";
  status: PrintStatus;
  pages: number;
  timestamp: Date;
}

const statusConfig = {
  queue: {
    label: "In Queue",
    className: "status-queue",
    icon: Clock,
  },
  printing: {
    label: "Printing",
    className: "status-printing",
    icon: Loader2,
  },
  ready: {
    label: "Ready for Pickup",
    className: "status-ready",
    icon: CheckCircle2,
  },
};

export default function XeroxHub() {
  const { toast } = useToast();
  const [colorMode, setColorMode] = useState<"color" | "bw">("bw");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [requests, setRequests] = useState<PrintRequest[]>([
    {
      id: "1",
      fileName: "Assignment_Week5.pdf",
      colorMode: "bw",
      status: "ready",
      pages: 12,
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      fileName: "Project_Presentation.pdf",
      colorMode: "color",
      status: "printing",
      pages: 8,
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: "3",
      fileName: "Research_Paper.pdf",
      colorMode: "bw",
      status: "queue",
      pages: 24,
      timestamp: new Date(Date.now() - 600000),
    },
  ]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a PDF file",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newRequest: PrintRequest = {
      id: Date.now().toString(),
      fileName: selectedFile.name,
      colorMode,
      status: "queue",
      pages: Math.floor(Math.random() * 20) + 1,
      timestamp: new Date(),
    };

    setRequests((prev) => [newRequest, ...prev]);
    setSelectedFile(null);
    setIsUploading(false);

    toast({
      title: "Print request submitted!",
      description: `${selectedFile.name} has been added to the queue.`,
    });

    // Simulate status progression
    setTimeout(() => {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === newRequest.id ? { ...r, status: "printing" } : r
        )
      );
    }, 5000);

    setTimeout(() => {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === newRequest.id ? { ...r, status: "ready" } : r
        )
      );
      toast({
        title: "Print ready! 🎉",
        description: `${selectedFile.name} is ready for pickup.`,
      });
    }, 10000);
  };

  const removeRequest = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
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
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Printer className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">
              Xerox Hub
            </h1>
            <p className="text-muted-foreground">
              Upload, print, and track your documents
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="bento-card">
            <h2 className="font-display font-semibold text-lg mb-4">
              New Print Request
            </h2>

            {/* File Upload */}
            <div className="mb-6">
              <Label
                htmlFor="file-upload"
                className="block w-full cursor-pointer"
              >
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors">
                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="w-8 h-8 text-primary" />
                      <span className="font-medium truncate max-w-[200px]">
                        {selectedFile.name}
                      </span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Click or drag PDF file here
                      </p>
                    </>
                  )}
                </div>
              </Label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            {/* Color Mode */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">
                Print Mode
              </Label>
              <RadioGroup
                value={colorMode}
                onValueChange={(value) => setColorMode(value as "color" | "bw")}
                className="flex gap-4"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="bw" id="bw" />
                  <span className="text-sm">Black & White</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="color" id="color" />
                  <span className="text-sm">Color</span>
                </label>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!selectedFile || isUploading}
              className="w-full bg-gradient-eco hover:opacity-90"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Printer className="w-4 h-4 mr-2" />
                  Request to Print
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Queue Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <div className="bento-card">
            <h2 className="font-display font-semibold text-lg mb-4">
              Print Queue
            </h2>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {requests.map((request) => {
                  const config = statusConfig[request.status];
                  const StatusIcon = config.icon;

                  return (
                    <motion.div
                      key={request.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-xl group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">
                            {request.fileName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {request.pages} pages •{" "}
                            {request.colorMode === "color" ? "Color" : "B&W"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={config.className}>
                          <StatusIcon
                            className={`w-3 h-3 ${
                              request.status === "printing" ? "animate-spin" : ""
                            }`}
                          />
                          {config.label}
                        </span>
                        {request.status === "ready" && (
                          <button
                            onClick={() => removeRequest(request.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded-lg transition-all"
                          >
                            <X className="w-4 h-4 text-destructive" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {requests.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Printer className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No print requests yet</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
