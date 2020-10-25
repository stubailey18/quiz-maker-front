import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import QuizForm from './QuizForm';
import QuestionForm from './QuestionForm';

export default function QuizEditor() {
    const [quiz, setQuiz] = useState({name: '', author: '', questions: []});
    const [activeComponent, setActiveComponent] = useState('QuizForm');
    const [mode, setMode] = useState('create');
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState({message: '', classes: ''});
    const queryParams = new URLSearchParams(useLocation().search);
    const quizId = queryParams.get('quizId');
    useEffect(() => {
        if (quizId) {
            const fetchQuiz = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/${quizId}`);
                    setQuiz(response.data);
                } catch (error) {
                    setStatus({
                        message: 'Oops! I can\'t fetch quizzes right now.',
                        classes: 'alert alert-danger'
                    });
                }
                setMode('update');
            }
            fetchQuiz();
        } else {
            setQuiz({name: '', author: '', questions: []});
            setMode('create');
        }
    }, [quizId]);
    useEffect(() => {
        if (saving) {
            if (mode === 'create') {
                const postQuiz = async () => {
                    try {
                        const response = await axios.post(process.env.REACT_APP_API_URL, quiz);
                        setQuiz(response.data);
                        setStatus({
                            message: 'Done! Your quiz has been saved.',
                            classes: 'alert alert-success'
                        });
                        setMode('update');
                    } catch (error) {
                        setStatus({
                            message: 'Oops! I can\'t save quizzes right now.',
                            classes: 'alert alert-danger'
                        });
                    }
                    setSaving(false);
                }
                postQuiz();
            } else {
                const putQuiz = async () => {
                    try {
                        await axios.put(`${process.env.REACT_APP_API_URL}/${quiz.id}`, quiz);
                        setStatus({
                            message: 'Done! Your quiz has been saved.',
                            classes: 'alert alert-success'
                        });
                    } catch (error) {
                        setStatus({
                            message: 'Oops! I can\'t save quizzes right now.',
                            classes: 'alert alert-danger'
                        });
                    }
                    setSaving(false);
                }
                putQuiz();
            }
        }
    }, [saving, mode, quiz]);
    return (
        <div className="row justify-content-center">
            <div className="container col-sm-10 col-md-8 col-lg-6">
                <h4 className="mb-3">{mode === 'create' ? 'New Quiz' : 'Edit Quiz'}</h4>
                {activeComponent === 'QuizForm' && 
                    <QuizForm 
                        quiz={quiz}
                        setQuiz={setQuiz}
                        onAddQuestion={() => setActiveComponent('QuestionForm')}
                        onSave={({name, author}) => {
                            setQuiz({...quiz, name, author});
                            setSaving(true);
                        }} 
                        onCancel={() => setQuiz({name: '', author: '', questions: []})} />
                }
                {activeComponent === 'QuestionForm' && 
                    <QuestionForm 
                        onSave={question => {
                            setQuiz({...quiz, questions: [...quiz.questions, question]});
                            setActiveComponent('QuizForm');
                        }} 
                        onCancel={() => setActiveComponent('QuizForm')} />
                }
                {status.message && (
                    <p className={status.classes}>{status.message}&nbsp;
                        <a onClick={() => setStatus({message: '', classes: ''})} 
                            className="float-right"
                            style={{cursor: 'pointer'}}>[ X ]</a>
                    </p>
                )}
            </div>
        </div>
    );
}