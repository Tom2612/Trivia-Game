import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import './style.css'

function App() {
  const [questions, setQuestions] = useState([]);
  const [start, setStart] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [chosenAnswers, setChosenAnswers] = useState([]);

  useEffect (() => {
    const getQuestions = async () => {
      const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
      const data = await res.json();
      setQuestions(data.results.map(question => {
        return {
          question: question.question,
          correct: question['correct_answer'],
          incorrect: question['incorrect_answers'].map(answer=> answer),
          chosen: ''
        }
      }));
    }
    getQuestions();

  }, [])
  
  function allCorrectAnswers() {
    setStart(prev => !prev)
    setCorrectAnswers(questions.map(question => question.correct));
    console.log(correctAnswers);
  }
  
  const randomizeAnswers = () => {
    const answerArray = [];
    incorrect.map(answer => answerArray.push(answer));
    answerArray.splice(Math.floor(Math.random() * 4), 0, correct)
    return answerArray;
  }

  function handleSelectAnswer(id, answer) {
    // console.log(id, answer);
    setChosenAnswers(prev => prev.concat(answer));
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
      <QuestionForm questions={questions} selectAnswer={handleSelectAnswer}/>
      <button onClick={allCorrectAnswers}>{!start ? 'Start Quiz' : 'Check Answers'}</button>
    </main>
  );
}

export default App;