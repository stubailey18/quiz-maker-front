import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteQuiz, fetchQuizzes } from '../services/quiz.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function QuizTable() {
    const [quizzes, setQuizzes] = useState([]);
    const [numDeletedQuizzes, setNumDeletedQuizzes] = useState(0);
    const [error, setError] = useState('');
    useEffect(() => {
            fetchQuizzes()
                .then(setQuizzes)
                .catch(() => setError('Oops! I can\'t fetch quizzes right now.'));
    }, [numDeletedQuizzes]);
    return (
        <>
            {quizzes.length > 0 ? (
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
                        {quizzes.map(({id, name, author, questions}) => (
                            <tr key={id}>
                                <td className="d-none d-sm-table-cell">{id}</td>
                                <td><Link to={`/quiz/${id}`}>{name}</Link></td>
                                <td className="d-none d-sm-table-cell">{author}</td>
                                <td className="d-none d-sm-table-cell">{questions.length}</td>
                                <td><Link to={`/quizeditor?quizId=${id}`}><FontAwesomeIcon icon={faPencilAlt} /></Link></td>
                                <td>
                                    <button 
                                        onClick={async () => {
                                            const confirmed = window.confirm(`Are you sure you want to delete ${name}?`);
                                            if (confirmed) {
                                                try {
                                                    await deleteQuiz(id);
                                                    setNumDeletedQuizzes(num => num + 1);
                                                } catch {
                                                    setError('Oops! I can\'t delete quizzes right now.')
                                                }
                                            }
                                        }}
                                        className="text-primary buttonAsAnchor">
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <p className="container">Alas there are no quizzes! Be the first to <Link to="/quizeditor">make one</Link>.</p>}
            {error && <p className="alert alert-danger">{error}</p>}
        </>
    );
}