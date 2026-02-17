import { MessageSquare, Eye, ArrowUp, ArrowDown } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Question } from "../App";

interface QuestionCardProps {
  question: Question;
  onClick: () => void;
  onVote: (id: string, delta: number) => void;
}

export function QuestionCard({ question, onClick, onVote }: QuestionCardProps) {
  const timeAgo = getTimeAgo(question.timestamp);

  return (
    <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex gap-6">
        {/* Vote section */}
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onVote(question.id, 1);
            }}
            className="p-1 h-auto"
          >
            <ArrowUp className="size-5 text-slate-600" />
          </Button>
          <span className="text-slate-900">{question.votes}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onVote(question.id, -1);
            }}
            className="p-1 h-auto"
          >
            <ArrowDown className="size-5 text-slate-600" />
          </Button>
        </div>

        {/* Question content */}
        <div className="flex-1" onClick={onClick}>
          <h3 className="text-blue-600 hover:text-blue-700 mb-2">
            {question.title}
          </h3>
          <p className="text-slate-600 mb-4 line-clamp-2">{question.content}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-slate-600">
              <div className="flex items-center gap-1">
                <MessageSquare className="size-4" />
                <span>{question.answers} answers</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="size-4" />
                <span>{question.views} views</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src={question.avatar} alt={question.author} />
                <AvatarFallback>{question.author[0]}</AvatarFallback>
              </Avatar>
              <span className="text-slate-600">
                {question.author} asked {timeAgo}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}
