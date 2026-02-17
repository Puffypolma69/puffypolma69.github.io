import { QuestionCard } from "./QuestionCard";
import { Question } from "../App";

interface QuestionFeedProps {
  questions: Question[];
  onSelectQuestion: (id: string) => void;
  onVoteQuestion: (id: string, delta: number) => void;
}

export function QuestionFeed({
  questions,
  onSelectQuestion,
  onVoteQuestion,
}: QuestionFeedProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-slate-900">All Questions</h1>
        <p className="text-slate-600">{questions.length} questions</p>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            onClick={() => onSelectQuestion(question.id)}
            onVote={onVoteQuestion}
          />
        ))}
      </div>
    </div>
  );
}
