import React, { useState, useEffect } from 'react';
import axios from "axios";
import QuizTable from "./QuizTable";

export default function Quizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL);
                setQuizzes(response.data);
            } catch (error) {
                setError('Oops! I\'m currently unable to retrieve quizzes. Please try again later.');
            }
        }
        fetchQuizzes();
    }, []);
    return (
        <>
            {quizzes.length > 0 && <QuizTable quizzes={quizzes} />}
            {error && <p className="alert alert-danger">{error}</p>}
        </>
    );
}