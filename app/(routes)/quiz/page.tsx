/* eslint-disable */
"use client";

import { useState, useEffect } from "react";

interface QuizQuestion {
  question: string;
  options?: { [key: string]: string };
  matches?: [string, string][];
  correct_answer?: string;
  feedback: string;
}

interface QuizData {
  quiz: QuizQuestion[];
}

export default function QuizPage() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchQuiz = async () => {
    try {
      //const response = await fetch('http://localhost:8002/Quiz?data=next');
      //const rawData = await response.json();
      const mockData = `[
  {
    "quiz": [
      {
        "question": "اختر الحرف الأول من كلمة 'تفاحة'",
        "options": {
          "أ": "ت",
          "ب": "ف",
          "ج": "خ"
        },
        "correct_answer": "أ",
        "feedback": "أحسنت!"
      },
      {
        "question": "ما هو لون التفاحة؟",
        "options": {
          "أ": "أحمر",
          "ب": "أخضر",
          "ج": "أزرق"
        },
        "correct_answer": "أ",
        "feedback": "رائع!"
      },
      {
        "question": "أي من هذه الأشياء يستخدم للكتابة؟",
        "options": {
          "أ": "كرة",
          "ب": "قلم",
          "ج": "حقيبة"
        },
        "correct_answer": "ب",
        "feedback": "عمل جيد!"
      },
      {
        "question": "ماذا نأكل في الصباح؟",
        "options": {
          "أ": "الإفطار",
          "ب": "العشاء",
          "ج": "الغداء"
        },
        "correct_answer": "أ",
        "feedback": "ممتاز!"
      },
      {
        "question": "ما هو أول حرف في كلمة 'مدرسة'؟",
        "options": {
          "أ": "م",
          "ب": "د",
          "ج": "س"
        },
        "correct_answer": "أ",
        "feedback": "أحسنت!"
      },
      {
        "question": "اختر الكلمة الصحيحة: القطة ___",
        "options": {
          "أ": "تنام",
          "ب": "يأكل",
          "ج": "يقفز"
        },
        "correct_answer": "أ",
        "feedback": "أحسنت!"
      }
    ]
  }
]
     
`;

      try {
        const parsedData = JSON.parse(mockData);
        if (Array.isArray(parsedData) && parsedData[0]?.quiz) {
          setQuizData({ quiz: parsedData[0].quiz });
          setCurrentQuestion(0);
          setFeedback(null);
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (e) {
        console.error("Error parsing quiz data:", e);
        setQuizData(null);
      }
    } catch (error) {
      console.error("Error in fetch:", error);
      setQuizData(null);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleAnswer = (answer: string) => {
    if (!quizData) return;

    const question = quizData.quiz[currentQuestion];
    if (answer === question.correct_answer) {
      setFeedback(question.feedback);
      setTimeout(() => {
        if (currentQuestion < quizData.quiz.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
          setFeedback(null);
        }
      }, 1500);
    }
  };

  const handleNextQuestion = () => {
    if (!quizData) return;

    if (currentQuestion < quizData.quiz.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setFeedback(null);
    }
  };

  if (!quizData?.quiz?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">جاري التحميل...</div>
      </div>
    );
  }

  const currentQuestionData = quizData.quiz[currentQuestion];

  if (!currentQuestionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">لا توجد أسئلة متاحة</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-[#2A3A5E]/50 p-8 rounded-2xl shadow-xl max-w-2xl w-full backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-white text-xl">
            السؤال {currentQuestion + 1} من {quizData.quiz.length}
          </span>
        </div>

        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {currentQuestionData.question}
        </h2>

        {currentQuestionData.options && (
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(currentQuestionData.options).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleAnswer(key)}
                disabled={!!feedback}
                className={`bg-[#FFA987] text-white text-xl font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#FF8A75] transition-all text-right ${
                  feedback ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        )}

        {feedback && (
          <div className="mt-6 text-2xl text-white text-center bg-green-500/20 p-4 rounded-lg">
            {feedback}
          </div>
        )}

        <div className="mt-8 flex justify-center space-x-4">
          {currentQuestion < quizData.quiz.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="bg-[#FFA987] text-white text-xl font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#FF8A75] transition-all"
            >
              السؤال التالي
            </button>
          ) : (
            <button
              onClick={fetchQuiz}
              className="bg-[#FFA987] text-white text-xl font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#FF8A75] transition-all"
            >
              إعادة الإختبار
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
