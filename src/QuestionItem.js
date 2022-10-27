import React, { useEffect, useState } from 'react';
import htmlFix from './htmlFixer';

export default function QuestionItem(props) {
    const { question, answers } = props.question;

    const answerElements = answers.map((answer, index) => (
        <h3 
            onClick={!props.answersChecked ? () => props.selectAnswer(props.id, answer) : null} 
            className={applyStyles(answer)}
            key={index}
        >
            {htmlFix(answer.text)}
        </h3>
    ))

    //Conditionally add styles here
    function applyStyles(answer) {
        if(!props.answersChecked) {
            return answer.chosen ? 'answer chosen' : 'answer'
        } else if (props.answersChecked && answer.correct) {
            return 'answer correct'
        } else if (props.answersChecked && answer.chosen && !answer.correct) {
            return 'answer wrong'
        } else {
            return 'answer'
        }
    }

    return (
        <div id={props.id} className="question-item">
            <h3 className="question">{props.id + 1}) {htmlFix(question)}</h3>
            <div className="container--answers">
                {answerElements}
            </div>
        </div>
    )
}