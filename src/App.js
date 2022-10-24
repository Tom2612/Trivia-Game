import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import './style.css'

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [start, setStart] = useState(false)

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
    getAnswers();

  }, [])

  useEffect(() => {
    console.log(answers)
  }, [answers])

  function getAnswers() {
    const answerArray = [];
    questions.map(question => {
      answerArray.push(question.answers)
    })
    setAnswers(answerArray)
  }

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

  function handleSelectAnswer(id, answer) {
    // console.log(answer);
    // setQuestions((prev) => {
    //   return prev[id].answers.map(answer => {
    //     return answer.text = answer ? {
    //       ...answer,
    //       chosen: !answer.chosen
    //     } : answer
    //   })
    // })
    }

  useEffect(() => {
    console.log(questions)
  }, [questions])
  
  
  return (
    <main>
      <h1>App</h1>
      <QuestionForm questions={questions} selectAnswer={handleSelectAnswer} />
      <button>{!start ? 'Start Quiz' : 'Check Answers'}</button>
    </main>
  );
}

export default App;