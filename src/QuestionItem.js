import React from 'react';

export default function QuestionItem(props) {
    const { question, correct, incorrect } = props.question;

    const randomizeAnswers = () => {
        const answerArray = [];
        incorrect.map(answer => answerArray.push(answer));
        answerArray.splice(Math.floor(Math.random() * 4), 0, correct)
        console.log('answers', answerArray)
        return answerArray;
    }

    return (
        <div>
            <h3>{question}</h3>
            {randomizeAnswers().map(answer => {
                if(answer === correct) {
                    return <h3 style={{color: 'red'}} className='answer'>{answer}</h3>
                } else {
                    return <h3 style={{color: 'green'}} className='answer'>{answer}</h3>
                }
            })}
        </div>
    )
}