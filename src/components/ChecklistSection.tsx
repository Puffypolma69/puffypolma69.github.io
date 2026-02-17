import { ChecklistSectionData, ChecklistItem } from "../App";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { CheckCircle2, ExternalLink } from "lucide-react";

interface ChecklistSectionProps {
  section: ChecklistSectionData;
  onToggleItem: (sectionId: string, itemId: string) => void;
}

interface ChecklistItemRendererProps {
  item: ChecklistItem;
  sectionId: string;
  onToggleItem: (sectionId: string, itemId: string) => void;
  depth?: number;
}

function ChecklistItemRenderer({ item, sectionId, onToggleItem, depth = 0 }: ChecklistItemRendererProps) {
  const paddingLeft = depth > 0 ? `${depth * 1.5}rem` : "0";

  return (
    <div>
      <div
        className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
        style={{ paddingLeft }}
      >
        <Checkbox
          id={item.id}
          checked={item.checked}
          onCheckedChange={() => onToggleItem(sectionId, item.id)}
          className="mt-1"
        />
        <div className="flex-1">
          <label
            htmlFor={item.id}
            className={`cursor-pointer block ${
              item.checked ? "text-slate-500 line-through" : "text-slate-700"
            } ${depth === 0 ? "font-bold" : ""}`}
          >
            {item.label}
          </label>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 mt-1 text-sm"
            >
              <ExternalLink className="size-3.5" />
              Open Document
            </a>
          )}
          {item.description && (
            <p className="text-slate-500 mt-1">{item.description}</p>
          )}
        </div>
      </div>
      
      {item.children && item.children.length > 0 && (
        <div className="space-y-2 mt-2">
          {item.children.map((child) => (
            <ChecklistItemRenderer
              key={child.id}
              item={child}
              sectionId={sectionId}
              onToggleItem={onToggleItem}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ChecklistSection({ section, onToggleItem }: ChecklistSectionProps) {
  const countItemsRecursive = (items: ChecklistItem[]): number => {
    return items.reduce((sum, item) => {
      return sum + 1 + (item.children ? countItemsRecursive(item.children) : 0);
    }, 0);
  };

  const countCheckedItemsRecursive = (items: ChecklistItem[]): number => {
    return items.reduce((sum, item) => {
      return (
        sum +
        (item.checked ? 1 : 0) +
        (item.children ? countCheckedItemsRecursive(item.children) : 0)
      );
    }, 0);
  };

  const completedItems = countCheckedItemsRecursive(section.items);
  const totalItems = countItemsRecursive(section.items);
  const isComplete = completedItems === totalItems;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-slate-900">{section.title}</h2>
          {isComplete && <CheckCircle2 className="size-5 text-green-600" />}
        </div>
        <span className="text-slate-600">
          {completedItems}/{totalItems}
        </span>
      </div>

      <div className="space-y-3">
        {section.items.map((item) => (
          <ChecklistItemRenderer
            key={item.id}
            item={item}
            sectionId={section.id}
            onToggleItem={onToggleItem}
          />
        ))}
      </div>
    </Card>
  );
}
