import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import './style.css'

function App() {
  const [questions, setQuestions] = useState([]);
  const [chosenAnswers, setChosenAnswers] = useState({});

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

  function handleSelectAnswer(id, answer) {
    console.log(id, answer)
    
  }
  
  return (
    <main>
      <h1>App</h1>
      <QuestionForm questions={questions} selectAnswer={handleSelectAnswer}/>
    </main>
  );
}

export default App;