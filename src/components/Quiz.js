import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuiz } from '../services/quiz.services';
import Question from './Question';
import QuizResult from './QuizResult';

export default function Quiz() {
    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState('');
    const [index, setIndex] = useState(0);
    const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
    const {quizId} = useParams();
    useEffect(() => {
        fetchQuiz(quizId)
            .then(setQuiz)
            .catch(() => setError('Oops! I can\'t fetch quizzes right now.'));
    }, [quizId]);
    return (
        <>
            {quiz && index < quiz.questions.length && (
                <Question 
                    question={quiz.questions[index]} 
                    onCorrectAnswer={() => setNumCorrectAnswers(nca => nca + 1)}
                    onNextQuestion={() => setIndex(index => index + 1)} />
            )}
            {quiz && index >= quiz.questions.length && (
                <QuizResult 
                    numQuestions={quiz.questions.length} 
                    numCorrectAnswers={numCorrectAnswers} />
            )}
            {error && <p className="alert alert-danger">{error}</p>}
        </>
    );
}