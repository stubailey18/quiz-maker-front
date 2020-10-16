import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Quizzes from './components/Quizzes';
import Quiz from './components/Quiz';

export default function App() {
    return (
        <div className="container">
            <h1 className="display-4 mt-4 mb-4 text-center">Quiz Maker</h1>
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
                            <li className="nav-item">
                                <Link to="/" className="navbar-brand">QM</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/quizzes" className="nav-link">Quizzes</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/newquiz" className="nav-link">New quiz</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/">{null}</Route>
                    <Route path="/quizzes"><Quizzes /></Route>
                    <Route path="/quiz/:quizId"><Quiz /></Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}