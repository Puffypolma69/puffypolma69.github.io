import { MessageSquare, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  onAskQuestion: () => void;
}

export function Header({ onAskQuestion }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-8 text-blue-600" />
            <span className="text-slate-900">DevQ&A</span>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search questions..."
                className="pl-10"
              />
            </div>
          </div>

          <Button onClick={onAskQuestion}>Ask Question</Button>
        </div>
      </div>
    </header>
  );
}
