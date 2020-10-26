import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import QuizForm from './QuizForm';
import QuestionForm from './QuestionForm';
import { saveQuestionImages } from '../services/quiz.services';

export default function QuizEditor() {
    const [quiz, setQuiz] = useState({name: '', author: '', questions: []});
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
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
                        const temp = await saveQuestionImages(quiz);
                        const response = await axios.post(process.env.REACT_APP_API_URL, temp);
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
                        const temp = await saveQuestionImages(quiz);
                        await axios.put(`${process.env.REACT_APP_API_URL}/${quiz.id}`, temp);
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
    }, [saving]);
    return (
        <div className="row justify-content-center">
            <div className="container col-sm-10 col-md-8 col-lg-6">
                <h4 className="mb-3">{mode === 'create' ? 'New Quiz' : 'Edit Quiz'}</h4>
                {activeComponent === 'QuizForm' && 
                    <QuizForm 
                        quiz={quiz}
                        setQuiz={setQuiz}
                        setStatus={setStatus}
                        onEditQuestion={index => {
                            setSelectedQuestionIndex(index);
                            setActiveComponent('QuestionForm');
                        }}
                        onDeleteQuestion={index => {
                            const confirmed = window.confirm(`Are you sure you want to delete question ${index + 1}?`);
                            if (confirmed) {
                                quiz.questions.splice(index, 1);
                                setQuiz({...quiz});
                                setStatus({message: 'You\'ve unsaved changes!', classes: 'alert alert-warning'});
                            }
                        }}
                        onAddQuestion={() => setActiveComponent('QuestionForm')}
                        onSave={({name, author}) => {
                            setQuiz({...quiz, name, author});
                            setSaving(true);
                        }} 
                        onCancel={() => setQuiz({name: '', author: '', questions: []})} />
                }
                {activeComponent === 'QuestionForm' && 
                    <QuestionForm 
                        // selectedQuestionIndex !== null because 0 index is valid
                        question={selectedQuestionIndex !== null ? quiz.questions[selectedQuestionIndex] : null}
                        questionIndex={selectedQuestionIndex}
                        onSave={question => {
                            if (selectedQuestionIndex !== null) {
                                // update question
                                quiz.questions[selectedQuestionIndex] = question;
                                setQuiz({...quiz});
                            } else {
                                // add question
                                setQuiz({...quiz, questions: [...quiz.questions, question]});
                            }
                            setSelectedQuestionIndex(null);
                            setActiveComponent('QuizForm');
                            setStatus({message: 'You\'ve unsaved changes!', classes: 'alert alert-warning'});
                        }} 
                        onCancel={() => {
                            setSelectedQuestionIndex(null);
                            setActiveComponent('QuizForm');
                        }} />
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