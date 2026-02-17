import { useState } from "react";
import { ChecklistHeader } from "./components/ChecklistHeader";
import { ChecklistSection } from "./components/ChecklistSection";
import { ProgressBar } from "./components/ProgressBar";
import { ChecklistSummary } from "./components/ChecklistSummary";

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  link?: string;
  children?: ChecklistItem[];
}

export interface ChecklistSectionData {
  id: string;
  title: string;
  items: ChecklistItem[];
}

const initialChecklist: ChecklistSectionData[] = [
  {
    id: "ipt-rec-modal-validation",
    title: "IPT Rec Modal Validation Checklist",
    items: [
      {
        id: "confirm-plan",
        label: "Confirm what the user's current plan is",
        checked: false,
        children: [
          {
            id: "plan-freemium",
            label: "Freemium",
            checked: false,
          },
          {
            id: "plan-trial",
            label: "Trial",
            checked: false,
          },
          {
            id: "plan-esign-personal",
            label: "eSign Personal",
            checked: false,
          },
          {
            id: "plan-esign-standard",
            label: "eSign Standard",
            checked: false,
          },
          {
            id: "plan-esign-business",
            label: "eSign Business Pro",
            checked: false,
          },
          {
            id: "plan-iam",
            label: "IAM Starter / IAM Standard / IAM Professional",
            checked: false,
          },
        ]
      },
      {
        id: "identify-entry-points",
        label: "Identify entry points / host description affected (align with Confluence page)",
        checked: false,
        children: [
          {
            id: "entry-ndse",
            label: "NDSE (aka Martini) – e.g. eSign Home Upgrade CTA, eSign Home Freemium/Trial Popups",
            checked: false,
          },
          {
            id: "entry-radmin",
            label: "Radmin – e.g. RADmin Freemium Users View Plan Button, RADmin Trial Users View Plan Button",
            checked: false,
          },
          {
            id: "entry-snb",
            label: "Subscription & Billing – e.g. SnB Plan Card - Upgrade Plan CTA, SnB Envelopes Sent Card - Upgrade to Add CTA, SnB Home Dropdown - Upgrade Plan CTA",
            checked: false,
          },
          {
            id: "entry-maestro",
            label: "Maestro Empty State – Maestro Home Upgrade to IAM CTA",
            checked: false,
          },
          {
            id: "entry-navigator",
            label: "Navigator Empty State – Navigator Home Upgrade to IAM CTA",
            checked: false,
          },
          {
            id: "entry-overage",
            label: "Overage banners – e.g. Send Home Overage Banner, Maestro Home Overage Banner",
            checked: false,
          },
          {
            id: "entry-other",
            label: "Other (specify)",
            checked: false,
          },
        ]
      },
      {
        id: "check-confluence",
        label: "Check current experience behavior in Confluence",
        checked: false,
        children: [
          {
            id: "confluence-open",
            label: "Open \"Recommendations IPT – Current Experiences\": Recommendations IPT - Current Experiences",
            checked: false,
            link: "https://docusign.atlassian.net/wiki/spaces/ECOM/pages/536940579/Recommendations+IPT+-+Current+Experiences",
          },
          {
            id: "confluence-confirm",
            label: "Confirm what is currently:",
            checked: false,
            children: [
              {
                id: "confluence-recommended-plan",
                label: "Recommended Plan / badge for this user type",
                checked: false,
              },
              {
                id: "confluence-default-selection",
                label: "Default selection",
                checked: false,
              },
              {
                id: "confluence-unlimited-iam",
                label: "Whether Unlimited or IAM recommendation variants are live vs experiment",
                checked: false,
              },
            ]
          },
        ]
      },
      {
        id: "capture-changes",
        label: "Capture what is changing vs. that source of truth",
        checked: false,
        children: [
          {
            id: "changes-plan-rec",
            label: "Clearly state: which plan recommendation is changing (e.g. Standard → Standard Unlimited, recommend IAM Starter/Pro, etc.)",
            checked: false,
          },
          {
            id: "changes-default",
            label: "Clearly state: which default selection is changing",
            checked: false,
          },
          {
            id: "changes-note",
            label: "Note if change is:",
            checked: false,
            children: [
              {
                id: "changes-experiment",
                label: "an experiment (control vs variants)",
                checked: false,
              },
              {
                id: "changes-live",
                label: "a full-turn \"LIVE\" change to the current experience page",
                checked: false,
              },
            ]
          },
        ]
      },
      {
        id: "attached-context",
        label: "Attach Context (Figma screen if there's any)",
        checked: false,
      },
      {
        id: "locales",
        label: "Confirm locales & localization",
        checked: false,
        children: [
          {
            id: "locales-standard",
            label: "Use the standard IPT locale set for this surface (unless ticket specifies otherwise)",
            checked: false,
          },
          {
            id: "locales-contentful",
            label: "Only request translations for locales missing from Contentful",
            checked: false,
          },
          {
            id: "locales-job",
            label: "Create/update localization job and add LOC job ID/link in this ticket",
            checked: false,
          },
        ]
      },
    ],
  },
];

export default function App() {
  const [checklist, setChecklist] = useState<ChecklistSectionData[]>(initialChecklist);

  const toggleItemRecursive = (items: ChecklistItem[], itemId: string): ChecklistItem[] => {
    return items.map((item) => {
      if (item.id === itemId) {
        return { ...item, checked: !item.checked };
      }
      if (item.children) {
        return {
          ...item,
          children: toggleItemRecursive(item.children, itemId),
        };
      }
      return item;
    });
  };

  const handleToggleItem = (sectionId: string, itemId: string) => {
    setChecklist(
      checklist.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: toggleItemRecursive(section.items, itemId),
            }
          : section
      )
    );
  };

  const resetItemsRecursive = (items: ChecklistItem[]): ChecklistItem[] => {
    return items.map((item) => ({
      ...item,
      checked: false,
      children: item.children ? resetItemsRecursive(item.children) : undefined,
    }));
  };

  const handleReset = () => {
    setChecklist(
      checklist.map((section) => ({
        ...section,
        items: resetItemsRecursive(section.items),
      }))
    );
  };

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

  const totalItems = checklist.reduce(
    (sum, section) => sum + countItemsRecursive(section.items),
    0
  );
  const checkedItems = checklist.reduce(
    (sum, section) => sum + countCheckedItemsRecursive(section.items),
    0
  );
  const progress = (checkedItems / totalItems) * 100;

  // Check if all main checkboxes are checked
  const allMainItemsChecked = checklist.every((section) =>
    section.items.every((item) => item.checked)
  );

  const handleSubmit = () => {
    if (allMainItemsChecked) {
      window.open('https://docusign.atlassian.net/jira/core/projects/WEBOPS/forms/form/direct/24/10105', '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <ChecklistHeader 
        onReset={handleReset}
      />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-slate-900 mb-2">
            IPT Rec Modal - Jira Ticket Validation
          </h1>
          <p className="text-slate-600 mb-6">
            Manually verify that your Jira ticket contains all required information for the IPT Rec Modal feature
          </p>
          
          <ProgressBar progress={progress} checked={checkedItems} total={totalItems} />
        </div>

        <div className="space-y-4">
          {checklist.map((section) => (
            <ChecklistSection
              key={section.id}
              section={section}
              onToggleItem={handleToggleItem}
            />
          ))}
        </div>

        <ChecklistSummary
          checklist={checklist}
          totalItems={totalItems}
          checkedItems={checkedItems}
        />

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-slate-900 font-semibold mb-1">
                Ready to Submit?
              </h3>
              <p className="text-slate-600">
                {allMainItemsChecked
                  ? "All main requirements are checked. You can proceed with submission."
                  : "Please check all main requirements before submitting."}
              </p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!allMainItemsChecked}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                allMainItemsChecked
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              Submit Ticket
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
