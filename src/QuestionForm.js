import React from 'react';
import QuestionItem from './QuestionItem';

export default function QuestionForm(props) {
    
    return (
        <div>
            {props.questions.map((question, index) => {
                return <QuestionItem 
                            question={question} 
                            selectAnswer={props.selectAnswer} 
                            id={index} 
                            key={index}
                        />
            })}
            
        </div>
    )
}