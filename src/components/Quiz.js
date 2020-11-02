import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuiz } from '../services/quiz.services';
import Question from './Question';
import QuizResult from './QuizResult';

export default function Quiz() {
    const [quiz, setQuiz] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
    const [error, setError] = useState('');
    const {quizId} = useParams();
    useEffect(() => {
        fetchQuiz(quizId)
            .then(setQuiz)
            .catch(() => setError('Oops! I can\'t fetch quizzes right now.'));
    }, [quizId]);
    return (
        <>
            {quiz && questionIndex < quiz.questions.length && (
                <Question 
                    question={quiz.questions[questionIndex]} 
                    onCorrectAnswer={() => setNumCorrectAnswers(num => num + 1)}
                    onNextQuestion={() => setQuestionIndex(index => index + 1)} />
            )}
            {quiz && questionIndex >= quiz.questions.length && (
                <QuizResult 
                    numQuestions={quiz.questions.length} 
                    numCorrectAnswers={numCorrectAnswers} />
            )}
            {error && <p className="alert alert-danger">{error}</p>}
        </>
    );
}