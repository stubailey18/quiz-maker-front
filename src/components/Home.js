import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Home() {
    return (
        <div className="container">
            <p>Welcome to Quiz Maker!</p>
            <div className="alert alert-warning">
                <p><strong>Warning!</strong></p>
                <p>This app is for demonstration purposes only. It does not support user registration nor login. The quizzes you make may be viewed, edited, and deleted by anyone.</p>
            </div>
            <p><Link to="/quizeditor">Make a quiz</Link></p>
            <p><Link to="/quizzes">Take a quiz</Link></p>
        </div>
    );
}