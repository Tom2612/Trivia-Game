import React, { useEffect, useState } from 'react';

export default function QuestionItem(props) {
    const { question, allAnswers } = props.question;
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        answerArray();
    }, [])

    const answerArray = () =>{
        const array = [];
        for(let i = 0; i < 4; i++) {
            let randomElement = allAnswers[Math.floor(Math.random() * 4)];
            while (array.includes(randomElement)){
                randomElement = allAnswers[Math.floor(Math.random() * 4)];
            }
            array.push(randomElement);
        }
        setAnswers(array);
    }

    const answerElements = answers.map(answer => (
        <h3 className='answer' onClick={() => props.selectAnswer(props.id, answer)}>
            {answer.replace(/(&quot\;)/g,"\"").replace(/(&#039;)/g,"\'").replace(/(&amp;)/g,"\&")}
        </h3>
    ))

    return (
        <div id={props.id}>
            <h3>{question.replace(/(&quot\;)/g,"\"").replace(/(&#039;)/g,"\'").replace(/(&amp;)/g,"\&")}</h3>
            {answerElements}
        </div>
    )
}