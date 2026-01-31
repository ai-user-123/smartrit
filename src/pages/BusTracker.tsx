import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bus, MapPin, Clock, Navigation, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BusData {
  id: string;
  name: string;
  route: string;
  eta: number;
  status: "on-route" | "arriving" | "delayed";
  position: { lat: number; lng: number };
  nextStops: string[];
  capacity: number;
}

const mockBuses: BusData[] = [
  {
    id: "shuttle-a",
    name: "Campus Shuttle A",
    route: "Main Gate → Library → Science Block → Hostel",
    eta: 5,
    status: "arriving",
    position: { lat: 12.9716, lng: 77.5946 },
    nextStops: ["Main Gate", "Library", "Science Block"],
    capacity: 65,
  },
  {
    id: "shuttle-b",
    name: "Campus Shuttle B",
    route: "Hostel → Sports Complex → Admin → Main Gate",
    eta: 12,
    status: "on-route",
    position: { lat: 12.9726, lng: 77.5956 },
    nextStops: ["Sports Complex", "Admin Block", "Main Gate"],
    capacity: 45,
  },
];

const statusConfig = {
  "on-route": { label: "On Route", color: "bg-accent" },
  arriving: { label: "Arriving Soon", color: "bg-success" },
  delayed: { label: "Delayed", color: "bg-warning" },
};

export default function BusTracker() {
  const [buses, setBuses] = useState(mockBuses);
  const [selectedBus, setSelectedBus] = useState<string | null>("shuttle-a");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate real-time ETA updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prev) =>
        prev.map((bus) => ({
          ...bus,
          eta: Math.max(0, bus.eta - 1),
          status: bus.eta <= 2 ? "arriving" : bus.status,
        }))
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setBuses(mockBuses);
    setIsRefreshing(false);
  };

  const selectedBusData = buses.find((b) => b.id === selectedBus);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Bus className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold">
                Live Bus Tracker
              </h1>
              <p className="text-muted-foreground">
                Real-time campus shuttle locations
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bus List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          {buses.map((bus) => {
            const status = statusConfig[bus.status];
            const isSelected = selectedBus === bus.id;

            return (
              <motion.div
                key={bus.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedBus(bus.id)}
                className={`bento-card cursor-pointer transition-all ${
                  isSelected ? "ring-2 ring-accent shadow-tech" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${status.color} ${
                        bus.status === "arriving" ? "animate-pulse" : ""
                      }`}
                    />
                    <h3 className="font-display font-semibold">{bus.name}</h3>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted">
                    {status.label}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-display font-bold text-2xl text-accent">
                      {bus.eta}
                    </span>
                    <span className="text-sm text-muted-foreground">min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Bus className="w-4 h-4" />
                    <span>{bus.capacity}% full</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-3 line-clamp-1">
                  {bus.route}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Map & Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* Mock Map */}
          <div className="bento-card-tech overflow-hidden">
            <div className="relative aspect-[16/9] bg-tech-light rounded-xl overflow-hidden">
              {/* Mock map background */}
              <div className="absolute inset-0 bg-gradient-to-br from-tech-light via-accent/5 to-tech-light">
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute w-full h-px bg-accent/30"
                      style={{ top: `${i * 11}%` }}
                    />
                  ))}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute h-full w-px bg-accent/30"
                      style={{ left: `${i * 11}%` }}
                    />
                  ))}
                </div>

                {/* Campus landmarks */}
                <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[10px] mt-1 text-muted-foreground">
                    Main Gate
                  </span>
                </div>

                <div className="absolute top-1/3 right-1/3 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[10px] mt-1 text-muted-foreground">
                    Library
                  </span>
                </div>

                <div className="absolute bottom-1/4 right-1/4 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[10px] mt-1 text-muted-foreground">
                    Science Block
                  </span>
                </div>

                {/* Bus markers */}
                {buses.map((bus, index) => (
                  <motion.div
                    key={bus.id}
                    animate={{
                      x: [0, 10, 0, -10, 0],
                      y: [0, -5, 0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    className="absolute flex flex-col items-center cursor-pointer"
                    style={{
                      top: `${30 + index * 25}%`,
                      left: `${40 + index * 15}%`,
                    }}
                    onClick={() => setSelectedBus(bus.id)}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                        selectedBus === bus.id
                          ? "bg-accent text-accent-foreground animate-pulse-tech"
                          : "bg-background border-2 border-accent"
                      }`}
                    >
                      <Bus className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium mt-1 px-2 py-0.5 rounded-full bg-background/90 shadow-sm">
                      {bus.eta} min
                    </span>
                  </motion.div>
                ))}

                {/* Route line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 25% 25% Q 40% 30%, 50% 45% T 75% 75%"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.5"
                  />
                </svg>
              </div>

              {/* Map overlay info */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="glass rounded-lg px-3 py-2 text-xs flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-accent" />
                  <span>Live tracking active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Bus Details */}
          {selectedBusData && (
            <motion.div
              key={selectedBusData.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bento-card"
            >
              <h3 className="font-display font-semibold text-lg mb-4">
                {selectedBusData.name} - Next Stops
              </h3>
              <div className="space-y-3">
                {selectedBusData.nextStops.map((stop, index) => (
                  <div key={stop} className="flex items-center gap-4">
                    <div className="relative">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          index === 0 ? "bg-success" : "bg-muted"
                        }`}
                      />
                      {index < selectedBusData.nextStops.length - 1 && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-muted" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{stop}</p>
                      <p className="text-xs text-muted-foreground">
                        ~{selectedBusData.eta + index * 3} min
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
