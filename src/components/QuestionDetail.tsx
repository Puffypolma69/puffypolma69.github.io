import { ArrowLeft, ArrowUp, ArrowDown, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Question, Answer } from "../App";
import { useState } from "react";

interface QuestionDetailProps {
  question: Question;
  answers: Answer[];
  onBack: () => void;
  onAnswerSubmit: (questionId: string, content: string) => void;
  onVoteQuestion: (id: string, delta: number) => void;
  onVoteAnswer: (id: string, delta: number) => void;
  onAcceptAnswer: (id: string) => void;
}

export function QuestionDetail({
  question,
  answers,
  onBack,
  onAnswerSubmit,
  onVoteQuestion,
  onVoteAnswer,
  onAcceptAnswer,
}: QuestionDetailProps) {
  const [answerContent, setAnswerContent] = useState("");

  const handleSubmit = () => {
    if (answerContent.trim()) {
      onAnswerSubmit(question.id, answerContent);
      setAnswerContent("");
    }
  };

  const sortedAnswers = [...answers].sort((a, b) => {
    if (a.isAccepted) return -1;
    if (b.isAccepted) return 1;
    return b.votes - a.votes;
  });

  return (
    <div>
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="size-4 mr-2" />
        Back to questions
      </Button>

      {/* Question */}
      <Card className="p-8 mb-6">
        <h1 className="text-slate-900 mb-4">{question.title}</h1>

        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onVoteQuestion(question.id, 1)}
              className="p-1 h-auto"
            >
              <ArrowUp className="size-6 text-slate-600" />
            </Button>
            <span className="text-slate-900">{question.votes}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onVoteQuestion(question.id, -1)}
              className="p-1 h-auto"
            >
              <ArrowDown className="size-6 text-slate-600" />
            </Button>
          </div>

          <div className="flex-1">
            <p className="text-slate-700 mb-6 whitespace-pre-wrap">
              {question.content}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <Avatar className="size-8">
                <AvatarImage src={question.avatar} alt={question.author} />
                <AvatarFallback>{question.author[0]}</AvatarFallback>
              </Avatar>
              <span>
                Asked by <span className="text-slate-900">{question.author}</span>
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Answers */}
      <div className="mb-6">
        <h2 className="text-slate-900 mb-4">
          {answers.length} Answer{answers.length !== 1 ? "s" : ""}
        </h2>

        <div className="space-y-4">
          {sortedAnswers.map((answer) => (
            <Card key={answer.id} className="p-6">
              <div className="flex gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onVoteAnswer(answer.id, 1)}
                    className="p-1 h-auto"
                  >
                    <ArrowUp className="size-5 text-slate-600" />
                  </Button>
                  <span className="text-slate-900">{answer.votes}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onVoteAnswer(answer.id, -1)}
                    className="p-1 h-auto"
                  >
                    <ArrowDown className="size-5 text-slate-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onAcceptAnswer(answer.id)}
                    className={`p-1 h-auto mt-2 ${
                      answer.isAccepted ? "text-green-600" : "text-slate-400"
                    }`}
                  >
                    <Check className="size-6" />
                  </Button>
                </div>

                <div className="flex-1">
                  {answer.isAccepted && (
                    <div className="flex items-center gap-2 mb-3">
                      <Check className="size-4 text-green-600" />
                      <span className="text-green-600">Accepted Answer</span>
                    </div>
                  )}
                  <p className="text-slate-700 mb-4 whitespace-pre-wrap">
                    {answer.content}
                  </p>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Avatar className="size-6">
                      <AvatarImage src={answer.avatar} alt={answer.author} />
                      <AvatarFallback>{answer.author[0]}</AvatarFallback>
                    </Avatar>
                    <span>{answer.author}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Answer form */}
      <Card className="p-6">
        <h3 className="text-slate-900 mb-4">Your Answer</h3>
        <Textarea
          value={answerContent}
          onChange={(e) => setAnswerContent(e.target.value)}
          placeholder="Write your answer here..."
          className="mb-4 min-h-32"
        />
        <Button onClick={handleSubmit}>Post Answer</Button>
      </Card>
    </div>
  );
}
