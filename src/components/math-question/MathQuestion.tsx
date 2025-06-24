import React, { useState, useEffect, useMemo } from 'react';
import './math-question.scss';

interface MathQuestionData {
  id: string;
  question: string;
  imageUrl?: string;
  answer: number;
  options?: number[];
  type: 'basic' | 'geometry' | 'word_problem';
}

const MathQuestion: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<MathQuestionData | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const mathQuestions = useMemo((): MathQuestionData[] => [
    {
      id: '1',
      question: 'What is 15 + 28?',
      answer: 43,
      type: 'basic',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmOGZmIi8+CiAgPGNpcmNsZSBjeD0iNzUiIGN5PSI1MCIgcj0iMTAiIGZpbGw9IiM2MzY2ZjEiLz4KICA8Y2lyY2xlIGN4PSI5NSIgY3k9IjUwIiByPSIxMCIgZmlsbD0iIzYzNjZmMSIvPgogIDxjaXJjbGUgY3g9IjExNSIgY3k9IjUwIiByPSIxMCIgZmlsbD0iIzYzNjZmMSIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzMzMzMzMyI+KzwvdGV4dD4KICA8Y2lyY2xlIGN4PSIxOTUiIGN5PSI1MCIgcj0iMTAiIGZpbGw9IiNlZjQ0NDQiLz4KICA8Y2lyY2xlIGN4PSIyMTUiIGN5PSI1MCIgcj0iMTAiIGZpbGw9IiNlZjQ0NDQiLz4KICA8dGV4dCB4PSIxNTAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjY2NjY2Ij4xNSArIDI4ID0gPzwvdGV4dD4KPC9zdmc+'
    },
    {
      id: '2',
      question: 'A rectangle has a length of 8 units and width of 5 units. What is its area?',
      answer: 40,
      type: 'geometry',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmOGZmIi8+CiAgPHJlY3QgeD0iNzUiIHk9IjYwIiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjM2NmYxIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8dGV4dCB4PSIxNTAiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMzMzMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjggdW5pdHM8L3RleHQ+CiAgPHRleHQgeD0iNDAiIHk9IjExNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjMzMzMzMzIiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAgNDAgMTE1KSI+NSB1bml0czwvdGV4dD4KICA8dGV4dCB4PSIxNTAiIHk9IjE4NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BcmVhID0gPzwvdGV4dD4KPC9zdmc+'
    },
    {
      id: '3',
      question: 'Sarah has 12 apples. She gives 5 to her friend and buys 8 more. How many apples does she have now?',
      answer: 15,
      type: 'word_problem',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmOGZmIi8+CiAgPGNpcmNsZSBjeD0iNjAiIGN5PSI4MCIgcj0iMTUiIGZpbGw9IiNlZjQ0NDQiLz4KICA8Y2lyY2xlIGN4PSI5MCIgY3k9IjgwIiByPSIxNSIgZmlsbD0iI2VmNDQ0NCIvPgogIDxjaXJjbGUgY3g9IjEyMCIgY3k9IjgwIiByPSIxNSIgZmlsbD0iI2VmNDQ0NCIvPgogIDx0ZXh0IHg9IjkwIiB5PSIxMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+MTIgYXBwbGVzPC90ZXh0PgogIDx0ZXh0IHg9IjkwIiB5PSIxNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+LSA1ICsgOCA9ID88L3RleHQ+CiAgPHRleHQgeD0iMjAwIiB5PSI2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZWY0NDQ0Ij7wn42OPC90ZXh0Pgo8L3N2Zz4='
    },
    {
      id: '4',
      question: 'What is 7 × 9?',
      answer: 63,
      type: 'basic',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmOGZmIi8+CiAgPGcgaWQ9InJvdy0xIj4KICAgIDxyZWN0IHg9IjUwIiB5PSI0MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNjM2NmYxIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPHJlY3QgeD0iNzUiIHk9IjQwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiM2MzY2ZjEiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICA8cmVjdCB4PSIxMDAiIHk9IjQwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiM2MzY2ZjEiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgPC9nPgogIDx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiMzMzMzMzMiPjcgw5cgOSA9ID88L3RleHQ+CiAgPHRleHQgeD0iMTUwIiB5PSIxMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NjY2NiI+KDcgcm93cyBvZiA5KTwvdGV4dD4KPC9zdmc+'
    }
  ], []);

  const generateRandomQuestion = React.useCallback(() => {
    const randomIndex = Math.floor(Math.random() * mathQuestions.length);
    setCurrentQuestion(mathQuestions[randomIndex]);
    setUserAnswer('');
    setIsCorrect(null);
    setShowResult(false);
  }, [mathQuestions]);

  const checkAnswer = () => {
    if (!currentQuestion || !userAnswer.trim()) return;
    
    const answer = parseInt(userAnswer);
    const correct = answer === currentQuestion.answer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const nextQuestion = () => {
    generateRandomQuestion();
  };

  useEffect(() => {
    generateRandomQuestion();
  }, [generateRandomQuestion]);

  if (!currentQuestion) return null;

  return (
    <div className="math-question">
      <div className="question-header">
        <h3>Math Practice</h3>
        <button onClick={nextQuestion} className="new-question-btn">
          New Question
        </button>
      </div>
      
      <div className="question-content">
        {currentQuestion.imageUrl && (
          <div className="question-image">
            <img src={currentQuestion.imageUrl} alt="Math visualization" />
          </div>
        )}
        
        <div className="question-text">
          <p>{currentQuestion.question}</p>
        </div>
        
        <div className="answer-section">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="answer-input"
            disabled={showResult}
          />
          
          {!showResult ? (
            <button onClick={checkAnswer} className="check-answer-btn">
              Check Answer
            </button>
          ) : (
            <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? '✅ Correct!' : `❌ Incorrect. The answer is ${currentQuestion.answer}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MathQuestion;