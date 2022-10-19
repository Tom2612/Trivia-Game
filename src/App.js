import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect (() => {
    const getQuestions = async () => {
      const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
      const data = await res.json();
      setQuestions(data.results.map(question => {
        return {
          question: question.question,
          'correct_answer': question['correct_answer'],
          'incorrect_answers': question['incorrect_answers'].map(answer=> answer)
        }
      }));
    }
    getQuestions();
  }, [])
  
  return (
    <main>
      <h1>App</h1>
      <QuestionForm questions={questions}/>
    </main>
  );
}

export default App;