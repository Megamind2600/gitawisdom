import { cn } from "@/lib/utils";

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export function ProgressBar({ percentage, className }: ProgressBarProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="w-32 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-orange-500 to-amber-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
      <span className="text-sm text-gray-600">
        {percentage === 100 ? "Complete" : `${Math.round(percentage)}%`}
      </span>
    </div>
  );
}
