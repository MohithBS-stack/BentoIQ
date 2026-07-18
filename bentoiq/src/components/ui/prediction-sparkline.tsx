"use client";

interface PredictionSparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

export function PredictionSparkline({
  data,
  width = 80,
  height = 28,
  color = "#10b981",
}: PredictionSparklineProps) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        style={{
          filter: `drop-shadow(0 2px 4px ${color}40)`,
        }}
      />
    </svg>
  );
}
