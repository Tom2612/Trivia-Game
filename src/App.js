import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import './style.css'

function App() {
  const [questions, setQuestions] = useState([]);
  const [start, setStart] = useState(false)

  useEffect (() => {
    const getQuestions = async () => {
      const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
      const data = await res.json();
      setQuestions(data.results.map(question => {
        return {
          question: question.question,
          correct: question['correct_answer'],
          incorrect: question['incorrect_answers'],
          allAnswers: answerArray(question),
          chosen: ''
        }
      }));
    }
    getQuestions();

  }, [])

  const answerArray = (question) =>{
    const answers = [...question['incorrect_answers']].concat(question['correct_answer'])
    const array = [];
    for(let i = 0; i < 4; i++) {
        let randomElement = answers[Math.floor(Math.random() * 4)];
        while (array.includes(randomElement)){
            randomElement = answers[Math.floor(Math.random() * 4)];
        }
        array.push(randomElement);
    }
    return array;
}

  function handleSelectAnswer(id, answer) {
    console.log(id, answer);
    setQuestions(prev => prev.map((question, index) => {
      return index === id ? {
        ...question,
        chosen: answer
      } : question
    }))
    console.log(questions)
  }
  
  
  return (
    <main>
      <h1>App</h1>
      <QuestionForm questions={questions} selectAnswer={handleSelectAnswer} />
      <button>{!start ? 'Start Quiz' : 'Check Answers'}</button>
    </main>
  );
}

export default App;