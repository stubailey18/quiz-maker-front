import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Question from './Question';
import QuizResult from './QuizResult';

export default function Quiz() {
    const {quizId} = useParams();
    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState('');
    const [index, setIndex] = useState(0);
    const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/${quizId}`);
                setQuiz(response.data);
            } catch (error) {
                setError('Oops! I\'m currently unable to retrieve the quiz. Please try again later.');
            }
        }
        fetchQuiz();
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