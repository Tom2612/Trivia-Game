import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import Overlay from './Overlay';
import './style.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [start, setStart] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answersChecked, setAnswersChecked] = useState(false);
  const [restart, setRestart] = useState(false);

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

  }, [restart]);

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

  function handleStartQuiz() {
    setStart(prev => !prev);
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

  function resetGame() {
    setQuestions([]);
    setStart(prev => !prev);
    setAnswersChecked(false);
    setCorrectCount(0);
    setRestart(prev => !prev);
  }
  
  return (
    <main>
      <h1>Triviapp</h1>
      {!start ? <Overlay /> : null}
      <div className="container">
        {start && <QuestionForm questions={questions} selectAnswer={handleSelectAnswer} answersChecked={answersChecked}/>}
        {!answersChecked ? start ? 
          <button onClick={!answersChecked ? handleSubmitQuiz : null} className='btn--submit'>Check Answers</button> 
          :
          <button onClick={handleStartQuiz} className='btn--start'>Start Quiz</button>
          :
          null
        }
        {answersChecked && 
          <div className="results">
            <h4 className="finish-message">
            {correctCount > 0 ? `Congratulations, you got ${correctCount} out of 5!` : 'Better luck next time!'}
            </h4>
            <button onClick={resetGame} className="btn--reset">Reset</button>
          </div>
        }
      </div>
    </main>
  );
}

export default App;