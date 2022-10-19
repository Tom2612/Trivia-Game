import React from 'react';

export default function QuestionItem(props) {

    const randomizeAnswers = () => {
        
    }

    return (
        <div>
            <h3>{props.question.question}</h3>
            <h3>{props.question['correct_answer']}</h3>
            {props.question['incorrect_answers'].map(answer => (<h3>{answer}</h3>))}
        </div>
    )
}