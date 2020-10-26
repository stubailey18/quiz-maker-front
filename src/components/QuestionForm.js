import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function QuestionForm(props) {
    const {questionIndex, onSave, onCancel} = props;
    const [question, setQuestion] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [distractors, setDistractors] = useState(['']);
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    useEffect(() => {
        if (props.question) {
            setQuestion(props.question.question);
            setCorrectAnswer(props.question.correctAnswer);
            setDistractors(props.question.distractors);
            setImageUrl(props.question.imageUrl);
        }
    }, [props.question]);
    return (
        <form>
            <div className="custom-file">
                <input 
                    type="file" 
                    onChange={e => {
                        setImageFile(e.target.files[0]);
                    }}
                    className="custom-file-input" />
                <label className="custom-file-label">Image</label>
            </div>
            <div className="form-group mt-3">
                <label>Question</label>
                <input 
                    type="text" 
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    className={formSubmitted && !question ? 'form-control invalidInput' : 'form-control'} />
                {formSubmitted && !question && <span className="invalidValueMessage">The question is required</span>}
            </div>
            <div className="form-group">
                <label>Correct answer</label>
                <input 
                    type="text" 
                    value={correctAnswer}
                    onChange={e => setCorrectAnswer(e.target.value)}
                    className={formSubmitted && !correctAnswer ? 'form-control invalidInput' : 'form-control'} />
                {formSubmitted && !correctAnswer && <span className="invalidValueMessage">The correct answer is required</span>}
            </div>
            {distractors.map((distractor, index) => (
                <div key={index} className="form-group">
                    <label>Distractor #{index + 1}</label>
                    <div className="container">
                        <div className="row">
                            <div className="col-10 p-0">
                                <input 
                                    type="text" 
                                    value={distractor}
                                    onChange={e => {
                                        e.persist();
                                        setDistractors(prevDistractors => {
                                            const newDistractors = [...prevDistractors];
                                            newDistractors[index] = e.target.value;
                                            return newDistractors;
                                        });
                                    }}
                                    className={formSubmitted && !distractors[index] ? 'form-control invalidInput' : 'form-control'} />
                            </div>
                            <div className="col-2 pr-0">
                                <button 
                                    type="button"
                                    onClick={() => {
                                        distractors.splice(index, 1);
                                        setDistractors([...distractors]);
                                    }}
                                    className="form-control text-primary">
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {formSubmitted && !distractors[index] && <span className="invalidValueMessage">Distractors must not be empty and at least one is required</span>}
                </div>    
            ))}
            <div className="form-group">
                <button 
                    type="button"
                    onClick={() => setDistractors([...distractors, ''])}
                    className="btn btn-dark">
                    Add distractor
                </button>
            </div>
            <div className="form-group">
                <button 
                    type="button"
                    onClick={() => {
                        setFormSubmitted(true);
                        if (question && correctAnswer && distractors.every(d => !!d)) {
                            onSave({question, correctAnswer, distractors, imageUrl, imageFile});
                        }
                    }}
                    className="btn btn-dark">
                    {questionIndex !== null ? 'Apply changes to quiz' : 'Add question to quiz'}
                </button>&nbsp;
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-dark">
                    Cancel
                </button>
            </div>
        </form>
    );
}