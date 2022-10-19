import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import './style.css'

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect (() => {
    const getQuestions = async () => {
      const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
      const data = await res.json();
      setQuestions(data.results.map(question => {
        return {
          question: question.question,
          correct: question['correct_answer'],
          incorrect: question['incorrect_answers'].map(answer=> answer)
        }
      }));
    }
    getQuestions();
  }, [])

  console.log('here', questions)
  
  return (
    <main>
      <h1>App</h1>
      <QuestionForm questions={questions}/>
    </main>
  );
}

export default App;