import React from 'react';

export default function Home() {
    return (
        <div className="container">
            <p>Welcome to Quiz Maker!</p>
            <div className="alert alert-warning">
                <p><strong>Warning!</strong></p>
                <p>This app is for demonstration purposes only. It does not support user registration nor login. The quizzes you make may be viewed, edited, and deleted by anyone.</p>
            </div>
        </div>
    );
}