import React, { useEffect, useState } from 'react';

const shuffleArray = array => {
    for (let i = 0; i < array.length; i++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return [...array];
}

const toHtmlId = str => {
    return `_${str.replaceAll(' ', '_')}`;
}

export default function Question(props) {
    const {question, correctAnswer, distractors, imageUrl} = props.question;
    const {onCorrectAnswer, onNextQuestion} = props;
    const [answers, setAnswers] = useState([]);
    const [answerButtonsDisabled, setAnswerButtonsDisabled] = useState(false);
    useEffect(() => {
        setAnswers(shuffleArray([...distractors, correctAnswer]));
    }, [correctAnswer, distractors]);
    return (
        <div className="row justify-content-center">
            <div className="container col-sm-10 col-lg-8">
                <div className="card">
                    <img alt={question} src={imageUrl} className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">{question}</h5>
                        {answers.map(answer => (
                            <div id={`${toHtmlId(answer)}`} key={answer} className="form-check">
                                <label className="form-check-label">
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={answer}
                                        onChange={() => {
                                            if (answer === correctAnswer) {
                                                document.querySelector(`#${toHtmlId(answer)}`).classList.add('rightAnswer');
                                                onCorrectAnswer();
                                            } else {
                                                document.querySelector(`#${toHtmlId(correctAnswer)}`).classList.add('rightAnswer');
                                                document.querySelector(`#${toHtmlId(answer)}`).classList.add('wrongAnswer');
                                            }
                                            setAnswerButtonsDisabled(true);
                                        }}
                                        disabled={answerButtonsDisabled}
                                        className="form-check-input d-block">
                                    </input>{answer}
                                </label>
                            </div>
                        ))}
                        <button 
                            onClick={() => {
                                setAnswerButtonsDisabled(false);
                                onNextQuestion();
                            }} className="btn btn-dark mt-3">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}