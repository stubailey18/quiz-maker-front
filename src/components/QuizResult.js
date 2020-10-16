import React from 'react';

export default function QuizResult(props) {
    const {numQuestions, numCorrectAnswers} = props;
    return (
        <div className="row justify-content-center text-center">
            <div className="container col-sm-8 col-lg-6">
                <h4>Finito!</h4>
                <p>You answered {numCorrectAnswers} of {numQuestions} questions correctly.</p>
            </div>
        </div>
    );
}