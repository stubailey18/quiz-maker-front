import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchQuiz, postQuiz, putQuiz } from '../services/quiz.services';
import QuizForm from './QuizForm';
import QuestionForm from './QuestionForm';

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
            fetchQuiz(quizId)
                .then(setQuiz)
                .catch(error => {
                    console.log(error);
                    setStatus({
                        message: 'Oops! I can\'t fetch quizzes right now.',
                        classes: 'alert alert-danger'
                    });
                });
            setMode('update');
        } else {
            setQuiz({name: '', author: '', questions: []});
            setMode('create');
        }
    }, [quizId]);
    useEffect(() => {
        if (saving) {
            if (mode === 'create') {
                postQuiz(quiz)
                    .then(quizWithId => {
                        setQuiz(quizWithId);
                        setStatus({
                            message: 'Done! Your quiz has been saved.',
                            classes: 'alert alert-success'
                        });
                        setMode('update');
                    }).catch(error => {
                        console.log(error);
                        setStatus({
                            message: 'Oops! I can\'t save quizzes right now.',
                            classes: 'alert alert-danger'
                        });
                    });
                setSaving(false);
            } else {
                putQuiz(quiz)
                    .then(() => {
                        setStatus({
                            message: 'Done! Your quiz has been saved.',
                            classes: 'alert alert-success'
                        });
                    }).catch(error => {
                        console.log(error);
                        setStatus({
                            message: 'Oops! I can\'t save quizzes right now.',
                            classes: 'alert alert-danger'
                        });
                    });
                setSaving(false);
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
                        }} />
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
                        <button 
                            onClick={() => setStatus({message: '', classes: ''})} 
                            className="float-right text-primary buttonAsAnchor">
                            [ X ]
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}