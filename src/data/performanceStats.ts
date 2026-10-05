import type { PerformanceStat } from "@/types";

export const PERFORMANCE_STATS: PerformanceStat[] = [
  {
    id: "startup",
    label: "Cold startup time",
    value: 0.8,
    suffix: "s",
    decimals: 1,
  },
  {
    id: "memory",
    label: "Idle memory usage",
    value: 45,
    suffix: "MB",
    decimals: 0,
  },
  {
    id: "languages",
    label: "Languages supported",
    value: 10, // Changed from 50 to 10
    suffix: "+",
    decimals: 0,
  },
  {
    id: "extensions",
    label: "Marketplace extensions",
    value: 50, // Changed from 1000 to 50
    suffix: "+",
    decimals: 0,
  },
];

export default PERFORMANCE_STATS;
