import { FileCheck2, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

interface ChecklistHeaderProps {
  onReset: () => void;
}

export function ChecklistHeader({ onReset }: ChecklistHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FileCheck2 className="size-8 text-blue-600" />
            <div>
              <span className="text-slate-900">Jira Ticket Validator</span>
              <p className="text-slate-500">IPT Rec Modal</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={onReset} title="Reset checklist">
              <RotateCcw className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
