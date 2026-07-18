"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ConfidenceRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  colorScheme?: "indigo" | "emerald" | "amber" | "rose" | "dark" | "blue";
}

export function ConfidenceRing({
  percentage,
  size = 100,
  strokeWidth = 10,
  label,
  colorScheme = "blue",
}: ConfidenceRingProps) {
  const [animatedPct, setAnimatedPct] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += percentage / steps;
      if (current >= percentage) {
        setAnimatedPct(percentage);
        clearInterval(timer);
      } else {
        setAnimatedPct(Math.round(current));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [percentage]);

  const center = size / 2;
  const radius = center - strokeWidth - 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getColors = () => {
    switch (colorScheme) {
      case "emerald": return { hex: "#10b981", shadow: "4px 4px 0px #111111", text: "text-gray-900" };
      case "amber": return { hex: "#ffc72c", shadow: "4px 4px 0px #111111", text: "text-gray-900" };
      case "rose": return { hex: "#da291c", shadow: "4px 4px 0px #111111", text: "text-gray-900" };
      case "dark": return { hex: "#111111", shadow: "4px 4px 0px #111111", text: "text-gray-900" };
      case "indigo": 
      case "blue": 
      default: return { hex: "#0033a0", shadow: "4px 4px 0px #111111", text: "text-gray-900" };
    }
  };

  const colors = getColors();

  return (
    <div className="flex flex-col items-center gap-3 relative group">
      <div 
        className="relative flex items-center justify-center bg-white transition-transform duration-200 hover:-translate-y-1" 
        style={{ width: size, height: size, border: "3px solid #111111", boxShadow: colors.shadow }}
      >
        {/* Main SVG Graphic */}
        <svg width={size} height={size} className="-rotate-90 z-20 overflow-visible" style={{ position: 'absolute', top: -3, left: -3 }}>
          {/* Background Track */}
          <circle
            cx={center} cy={center} r={radius}
            fill="none" stroke="#e0e0e0" strokeWidth={strokeWidth}
          />
          
          {/* Progress Ring */}
          <motion.circle
            cx={center} cy={center} r={radius}
            fill="none" stroke={colors.hex}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "linear" }}
            strokeLinecap="square"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center z-30 pointer-events-none">
          <span className={`font-black text-xl sm:text-2xl ${colors.text} tracking-tighter`} style={{ letterSpacing: "-0.05em" }}>
            {animatedPct}%
          </span>
        </div>
      </div>
      
      {label && (
        <span className="text-xs font-black text-gray-900 uppercase tracking-widest text-center mt-1">
          {label}
        </span>
      )}
    </div>
  );
}
