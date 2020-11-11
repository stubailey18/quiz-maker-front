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

export default function Question(props) {

    const {question, correctAnswer, distractors, imageUrl} = props.question;
    const {onCorrectAnswer, onNextQuestion} = props;

    const [answers, setAnswers] = useState([]);
    const [questionAnswered, setQuestionAnswered] = useState(false);
    const [userAnswer, setUserAnswer] = useState(null);

    useEffect(() => {
        setAnswers(shuffleArray([...distractors, correctAnswer]));
    }, [correctAnswer, distractors]);

    const handleAnswerChange = event => {
        setQuestionAnswered(true);
        setUserAnswer(event.target.value);
        if (event.target.value === correctAnswer) {
            onCorrectAnswer();
        }
    }

    const getInputContainerClasses = inputValue => {
        if (questionAnswered) {
            // if the question has been answered and the input value matches the correct answer
            // then mark this answer as the right one regardless of whether it's the one the user selected
            if (inputValue === correctAnswer) {
                return 'rightAnswer';
            // the question has been answered (and this input value does NOT match the correct answer)
            // but it does match the user answer then mark this answer as the wrong one (as selected by the user)
            } else if (inputValue === userAnswer) {
                return 'wrongAnswer';
            // return an empty string to avoid an 'undefined' class being added
            } else {
                return '';
            }
        // return an empty string to avoid an 'undefined' class being added
        } else {
            return '';
        }
    }

    const handleNextButtonClick = event => {
        setQuestionAnswered(false);
        setUserAnswer(null);
        onNextQuestion();
    }

    return (
        <div className="row justify-content-center">
            <div className="container col-sm-10 col-lg-8">
                <div className="card">
                    <img alt={question} src={imageUrl} className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">{question}</h5>
                        {answers.map((answer, index) => (
                            <div key={index} className={`form-check ${getInputContainerClasses(answer)}`}>
                                <label className="form-check-label">
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={answer}
                                        onChange={handleAnswerChange}
                                        checked={questionAnswered}
                                        disabled={questionAnswered}
                                        className="form-check-input d-block">
                                    </input>{answer}
                                </label>
                            </div>
                        ))}
                        <button 
                            onClick={handleNextButtonClick} className="btn btn-dark mt-3">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}