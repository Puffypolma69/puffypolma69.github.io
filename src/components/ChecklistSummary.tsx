import { ChecklistSectionData, ChecklistItem } from "../App";
import { Card } from "./ui/card";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

interface ChecklistSummaryProps {
  checklist: ChecklistSectionData[];
  totalItems: number;
  checkedItems: number;
}

export function ChecklistSummary({
  checklist,
  totalItems,
  checkedItems,
}: ChecklistSummaryProps) {
  const isComplete = checkedItems === totalItems;
  const progress = (checkedItems / totalItems) * 100;

  let status: "complete" | "good" | "needs-work";
  if (progress === 100) {
    status = "complete";
  } else if (progress >= 70) {
    status = "good";
  } else {
    status = "needs-work";
  }

  const collectIncompleteItems = (items: ChecklistItem[]): ChecklistItem[] => {
    const incomplete: ChecklistItem[] = [];
    
    for (const item of items) {
      if (!item.checked) {
        incomplete.push(item);
      }
      if (item.children) {
        incomplete.push(...collectIncompleteItems(item.children));
      }
    }
    
    return incomplete;
  };

  const incompleteSections = checklist
    .map((section) => ({
      ...section,
      incompleteItems: collectIncompleteItems(section.items),
    }))
    .filter((section) => section.incompleteItems.length > 0);

  return (
    <Card className="p-6 mt-6">
      <h3 className="text-slate-900 mb-4">Validation Summary</h3>

      {status === "complete" && (
        <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
          <CheckCircle2 className="size-5 text-green-600 mt-0.5" />
          <div>
            <p className="text-green-900">
              Excellent! This ticket meets all requirements.
            </p>
            <p className="text-green-700 mt-1">
              Your Jira ticket for IPT Rec Modal is ready to be submitted.
            </p>
          </div>
        </div>
      )}

      {status === "good" && (
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
          <AlertCircle className="size-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-blue-900">
              Good progress! A few items still need attention.
            </p>
            <p className="text-blue-700 mt-1">
              Review the unchecked items below before submitting.
            </p>
          </div>
        </div>
      )}

      {status === "needs-work" && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
          <XCircle className="size-5 text-amber-600 mt-0.5" />
          <div>
            <p className="text-amber-900">
              This ticket needs more work before submission.
            </p>
            <p className="text-amber-700 mt-1">
              Please complete the remaining requirements to ensure ticket quality.
            </p>
          </div>
        </div>
      )}

      {incompleteSections.length > 0 && (
        <div className="mt-4">
          <h4 className="text-slate-700 mb-3">Incomplete Items:</h4>
          <div className="space-y-3">
            {incompleteSections.map((section) => (
              <div key={section.id} className="border-l-4 border-slate-300 pl-4">
                <p className="text-slate-900 mb-2">
                  {section.title} ({section.incompleteItems.length} remaining)
                </p>
                <ul className="space-y-1">
                  {section.incompleteItems.map((item) => (
                    <li key={item.id} className="text-slate-600">
                      • {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
