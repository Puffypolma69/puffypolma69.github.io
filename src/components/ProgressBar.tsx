interface ProgressBarProps {
  progress: number;
  checked: number;
  total: number;
}

export function ProgressBar({ progress, checked, total }: ProgressBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-600">Overall Progress</span>
        <span className="text-slate-900">
          {checked} of {total} completed
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-center mt-2">
        <span className="text-slate-900">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}
