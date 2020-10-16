import React, { useEffect } from 'react';

const shuffleArray = array => {
    for (let i = 0; i < array.length; i++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }
}

export default function Question(props) {
    const {question, correctAnswer, distractors, imageFilename} = props.question;
    const {onCorrectAnswer, onNextQuestion} = props;
    const answers = [...distractors, correctAnswer];
    useEffect(() => shuffleArray(answers), [answers]);
    const handleAnswerChange = event => {
        const answer = event.target.value;
        if (answer === correctAnswer) {
            document.querySelector(`#_${answer}`).classList.add('rightAnswer');
            onCorrectAnswer();
        } else {
            document.querySelector(`#_${correctAnswer}`).classList.add('rightAnswer');
            document.querySelector(`#_${answer}`).classList.add('wrongAnswer');
        }
    }
    return (
        <div className="row justify-content-center">
            <div className="container col-sm-10 col-lg-8">
                <div className="card">
                    <img alt={question} src={`/images/${imageFilename}`} className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">{question}</h5>
                        {answers.map(answer => (
                            <div id={`_${answer}`} key={answer} className="form-check">
                                <label className="form-check-label">
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={answer}
                                        onChange={handleAnswerChange}
                                        className="form-check-input">
                                    </input>{answer}
                                </label>
                            </div>
                        ))}
                        <button onClick={onNextQuestion} className="btn btn-dark mt-3">Next</button>&nbsp;
                    </div>
                </div>
            </div>
        </div>
    );
}