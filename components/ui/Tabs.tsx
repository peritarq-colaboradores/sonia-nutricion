"use client";

import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  active: string;
  onChange: (id: string) => void;
  variant?: "line" | "pill";
}

export default function Tabs({ tabs, active, onChange, variant = "line" }: TabsProps) {
  if (variant === "pill") {
    return (
      <div className="flex flex-wrap gap-1.5 p-1 bg-warm-100 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150",
              active === tab.id
                ? "bg-white text-warm-900 shadow-sm"
                : "text-warm-500 hover:text-warm-700"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-0 border-b border-warm-100">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-150 -mb-px",
            active === tab.id
              ? "border-sage-500 text-sage-600"
              : "border-transparent text-warm-500 hover:text-warm-700 hover:border-warm-200"
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
