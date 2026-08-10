// src/components/workspace/StatCard.tsx
import React from "react";

interface StatCardProps {
  value: string;
  label: string;
  sublabel: string;
}

export default function StatCard({ value, label, sublabel }: StatCardProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <p className="text-3xl font-bold text-[#121D33]">{value}</p>
      <p className="mt-2 text-sm font-medium text-[#121D33]">{label}</p>
      <p className="text-xs text-[#8A93A6]">{sublabel}</p>
    </div>
  );
}
