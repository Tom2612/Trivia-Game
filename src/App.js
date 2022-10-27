import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import './style.css'

function App() {
  const [questions, setQuestions] = useState([]);
  const [start, setStart] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answersChecked, setAnswersChecked] = useState(false);

  useEffect (() => {
    const getQuestions = async () => {
      const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
      const data = await res.json();

      setQuestions(data.results.map(question => {
        return {
          question: question.question,
          answers: 
            answerArray(question),
        }
      }))
    }

    getQuestions();

  }, [])

  useEffect(() => {
    console.log(questions)
  }, [questions])

  const answerArray = (question) =>{
    const answers = [...question['incorrect_answers']].concat(question['correct_answer']);
    const array = [];
    for(let i = 0; i < 4; i++) {
        let randomElement = answers[Math.floor(Math.random() * 4)];
        while (array.includes(randomElement)){
            randomElement = answers[Math.floor(Math.random() * 4)];
        }
        array.push(randomElement);
    }
    return array.map(answer => {
      return {
        text: answer,
        chosen: false,
        correct: answer === question['correct_answer'] ? true : false
      }
    });
  }

  function handleSelectAnswer(id, ananswer) {
    const newAnswers = [...questions[id].answers];
    newAnswers.map(answer => {
    if (answer.text == ananswer.text) {
      answer.chosen = true;
    } else if (answer.text !== ananswer.text && answer.chosen) {
      answer.chosen = false;
    }})

    setQuestions(prev => prev.map(question => {
      return question.question === question ? {...question, answers: newAnswers } : question
    }))
  }

  function handleSubmitQuiz(){
    questions.map(question => {
      question.answers.map(answer => {
        if (answer.chosen && answer.correct) {
          setCorrectCount(prev => prev + 1);
        }
      })
    })
    setAnswersChecked(prev => !prev)
  }
  
  return (
    <main>
      <h1>App</h1>
      <QuestionForm questions={questions} selectAnswer={handleSelectAnswer} answersChecked={answersChecked}/>
      <button onClick={handleSubmitQuiz}>{!start ? 'Start Quiz' : 'Check Answers'}</button>
      <h4>Correct answers: {correctCount}</h4>
    </main>
  );
}

export default App;