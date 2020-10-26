import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function QuizTable() {
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState('');
    const [numDeletedQuizzes, setNumDeletedQuizzes] = useState(0);
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL);
                setQuizzes(response.data);
            } catch (error) {
                setError('Oops! I can\'t fetch quizzes right now.');
            }
        }
        fetchQuizzes();
    }, [numDeletedQuizzes]);
    return (
        <>
            {quizzes.length > 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="d-none d-sm-table-cell">ID</th>
                            <th>Quiz</th>
                            <th className="d-none d-sm-table-cell">Author</th>
                            <th className="d-none d-sm-table-cell">Questions</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizzes && quizzes.map(({id, name, author, questions}) => (
                            <tr key={id}>
                                <td className="d-none d-sm-table-cell">{id}</td>
                                <td><Link to={`/quiz/${id}`}>{name}</Link></td>
                                <td className="d-none d-sm-table-cell">{author}</td>
                                <td className="d-none d-sm-table-cell">{questions.length}</td>
                                <td><Link to={`/quizeditor?quizId=${id}`}><FontAwesomeIcon icon={faPencilAlt} /></Link></td>
                                <td><button 
                                    onClick={async () => {
                                        const confirmed = window.confirm(`Are you sure you want to delete ${name}?`);
                                        if (confirmed) {
                                            await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`);
                                            setNumDeletedQuizzes(num => num + 1);
                                        }
                                    }}
                                    className="text-primary"
                                    style={{background: 'none', border: 'none'}}><FontAwesomeIcon icon={faTrashAlt} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {error && <p className="alert alert-danger">{error}</p>}
        </>
    );
}