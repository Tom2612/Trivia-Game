import React, { useEffect, useState } from 'react';
import htmlFix from './htmlFixer';

export default function QuestionItem(props) {
    const { question, answers } = props.question;

    const answerElements = answers.map(answer => (
        <h3 
            className='answer' 
            onClick={() => props.selectAnswer(props.id, answer, question)} 
            style={answer.chosen ? {color: 'blue'}: null}
        >
            {htmlFix(answer.text)}
        </h3>
    ))

    return (
        <div id={props.id}>
            <h3>{props.id + 1}) {htmlFix(question)}</h3>
            {answerElements}
        </div>
    )
}