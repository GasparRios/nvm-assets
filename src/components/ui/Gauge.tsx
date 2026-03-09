import React from 'react';

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color?: string;
}

export const Gauge = ({ value, max, label, unit, color = "#329F5C" }: GaugeProps) => {
  const percentage = Math.min(Math.max(value / max, 0), 1);
  const strokeDasharray = 251; // 2 * PI * 40
  const strokeDashoffset = strokeDasharray * (1 - percentage);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative w-32 h-32">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="40"
            stroke="#333"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress Circle */}
          <circle
            cx="64"
            cy="64"
            r="40"
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold font-mono text-white">{value}</span>
          <span className="text-xs text-gray-400 font-mono">{unit}</span>
        </div>
      </div>
      <span className="mt-2 text-xs uppercase tracking-wider text-gray-500 font-medium">{label}</span>
    </div>
  );
};
