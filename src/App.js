import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Home from './components/Home';
import QuizTable from './components/QuizTable';
import Quiz from './components/Quiz';
import QuizEditor from './components/QuizEditor';

export default function App() {
    return (
        <div id="mainDiv" className="container">
            <h1 className="display-4 pt-4 pb-4 text-center">Quiz Maker</h1>
            <BrowserRouter>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark justify-content-center mb-4">
                    <button 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#collapsibleNavbar" 
                        className="navbar-toggler">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="collapsibleNavbar" className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li data-toggle="collapse" data-target="#collapsibleNavbar.show" className="nav-item">
                                <Link to="/" className="navbar-brand">QM</Link>
                            </li>
                            <li data-toggle="collapse" data-target="#collapsibleNavbar.show" className="nav-item">
                                <Link to="/quizzes" className="nav-link">Quizzes</Link>
                            </li>
                            <li data-toggle="collapse" data-target="#collapsibleNavbar.show" className="nav-item">
                                <Link to="/quizeditor" className="nav-link">New Quiz</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route path="/quizzes"><QuizTable /></Route>
                    <Route path="/quiz/:quizId"><Quiz /></Route>
                    <Route path="/quizeditor"><QuizEditor /></Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}