import React, { useEffect, useState } from 'react';

export default function QuestionItem(props) {
    const { question, allAnswers } = props.question;

    const answerElements = allAnswers.map(answer => (
        <h3 className='answer' onClick={() => props.selectAnswer(props.id, answer)}>
            {answer.replace(/(&quot\;)/g,"\"").replace(/(&#039;)/g,"\'").replace(/(&amp;)/g,"\&")}
        </h3>
    ))

    return (
        <div id={props.id}>
            <h3>{props.id + 1}) {question.replace(/(&quot\;)/g,"\"").replace(/(&#039;)/g,"\'").replace(/(&amp;)/g,"\&")}</h3>
            {answerElements}
        </div>
    )
}