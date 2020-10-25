import React, { useEffect, useState } from 'react';

export default function QuizForm(props) {
    const {quiz, setQuiz, onAddQuestion, onSave} = props;
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    useEffect(() => {
        setName(quiz.name);
        setAuthor(quiz.author);
    }, [quiz])
    return (
        <form>
            <div className="form-group">
                <label>Name *</label>
                <input 
                    type="text" 
                    value={name}
                    onChange={e => {
                        setName(e.target.value);
                        // apply the change to the quiz in the parent component
                        // this ensures that if the user adds a question before saving
                        // the changes he/she makes here are not lost when this comp. is re-rendered
                        setQuiz({...quiz, name: e.target.value});
                    }}
                    className={formSubmitted && !name ? 'form-control invalidInput' : 'form-control'} />
                {formSubmitted && !name && <span className="invalidValueMessage">The name is required</span>}
            </div>
            <div className="form-group">
                <label>Author *</label>
                <input 
                    type="text" 
                    value={author}
                    onChange={e => {
                        setAuthor(e.target.value);
                        // apply the change to the quiz in the parent component
                        // this ensures that if the user adds a question before saving
                        // the changes he/she makes here are not lost when this comp. is re-rendered
                        setQuiz({...quiz, author: e.target.value});
                    }}
                    className={formSubmitted && !author ? 'form-control invalidInput' : 'form-control'} />
                {formSubmitted && !author && <span className="invalidValueMessage">The author is required</span>}
            </div>
            <div className="form-group">
                <button
                    type="button"
                    onClick={onAddQuestion}
                    className="btn btn-dark">
                    Add question
                </button>
            </div>
            <div className="form-group">
                <button 
                    type="button"
                    onClick={() => {
                        setFormSubmitted(true);
                        if (name && author) {
                            onSave({name, author});
                        }
                    }}
                    className="btn btn-dark">
                    {quiz.id ? 'Save changes' : 'Save'}
                </button>
            </div>
        </form>
    );
}