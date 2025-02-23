/* eslint-disable */
'use client';

import { useState, useEffect } from 'react';

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
      const response = await fetch('http://localhost:8002/Quiz?data=next');
      let rawData = await response.json();
      
      // Clean up the data by removing backticks and "json" string
      if (typeof rawData === 'string') {
        rawData = rawData.replace("```json", '');
        rawData = rawData.replace("```", '');
        try {
          rawData = JSON.parse(rawData);
        } catch (e) {
          console.error('Error parsing cleaned JSON:', e);
          setQuizData(null);
          return;
        }
      }
      
      // Rest of the data handling
      if (rawData && rawData.quiz) {
        setQuizData({ quiz: rawData.quiz });
      } else if (Array.isArray(rawData) && rawData.length > 0) {
        const firstItem = rawData[0];
        if (firstItem && firstItem.quiz) {
          setQuizData({ quiz: firstItem.quiz });
        } else {
          console.error('Invalid quiz data structure:', rawData);
          setQuizData(null);
        }
      } else {
        console.error('Invalid data structure received:', rawData);
        setQuizData(null);
      }
      
      setCurrentQuestion(0);
      setFeedback(null);
    } catch (error) {
      console.error('Error fetching quiz:', error);
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
    }
  };

  const handleNextQuestion = () => {
    if (!quizData) return;
    
    if (currentQuestion < quizData.quiz.length - 1) {
      setCurrentQuestion(prev => prev + 1);
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {currentQuestionData.question}
        </h2>

        {currentQuestionData.options && (
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(currentQuestionData.options).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleAnswer(key)}
                className="bg-[#FFA987] text-white text-xl font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#FF8A75] transition-all text-right"
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

        <div className="mt-8 flex justify-center">
          <button
            onClick={fetchQuiz}
            className="bg-[#FFA987] text-white text-xl font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#FF8A75] transition-all"
          >
            سؤال جديد
          </button>
        </div>
      </div>
    </div>
  );
}
