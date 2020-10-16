import React from 'react';
import { Link } from 'react-router-dom';

export default function QuizTable(props) {
    const {quizzes} = props;
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Questions</th>
                </tr>
            </thead>
            <tbody>
                {quizzes && quizzes.map(({id, name, author, questions}) => (
                    <tr key={id}>
                        <td>{id}</td>
                        <td><Link to={`/quiz/${id}`}>{name}</Link></td>
                        <td>{author}</td>
                        <td>{questions.length}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}