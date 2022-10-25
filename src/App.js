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

  }, [])

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

  function handleSelectAnswer(id, ananswer, question) {
    console.log(ananswer, question)
    const newAnswers = [...questions[id].answers];
    newAnswers.map(answer => {
    if (answer.text == ananswer.text) {
      answer.chosen = true;
    } else if (answer.text !== ananswer.text && ananswer.chosen) {
      answer.chosen = false;
    }})

    const newQuestions = [...questions];
    newQuestions.map(question => {
      if(question.question === question) {
        question.answers = newAnswers;
      }
    })

    setQuestions([...newQuestions])

    console.log('newQuestions object', newQuestions)
    // console.log('newAnswers', newAnswers);

    // setQuestions(prev => {
    //   prev.map(item => { return item.question === question ? {...item, answers: [...newAnswers]} : item
      //   if (item.question === question) {
      //     console.log('item', item.question, question)
      //     return {...item, answers: [...newAnswers] }
      //   } else {
      //     console.log('not found')
      //     return {...item}
      //   }
      // })
    // })})
    // console.log('newQuestions', questions)

    // setQuestions((prev) => {
    //   const newAnswers = [...prev[id].answers]
    //   newAnswers.map(answer => {
    //     // console.log('answer', answer.text.toString()===ananswer.text, ananswer.text)
    //     if (answer.text == ananswer.text) {
    //       console.log('found', answer)
    //       answer.chosen = true;
    //       // const obj = {...answer, chosen: true}
    //       // console.log(obj);
    //       // newAnswers.splice(id, 1, obj)
    //       // array.push(obj)
    //     } else if (answer.text !== ananswer.text && answer.chosen) {
    //       answer.chosen = false;
    //   }})

    //   console.log('new', newAnswers)
    //   return [...prev]
    // })
    }

  useEffect(() => {
    console.log('updated questions in useEffect', questions)
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