import React from 'react';
import QuestionItem from './QuestionItem';

export default function QuestionForm(props) {
    
    return (
        <div>
            {props.questions.map(question => {
                return <QuestionItem question={question}/>
            })}
            
        </div>
    )
}