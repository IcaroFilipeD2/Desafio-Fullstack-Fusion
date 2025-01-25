import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeroProvider } from './context/HeroContext';
import './App.css';
import HomePage from './pages/HomePage';

const App = () => {
    return (
        <HeroProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        </HeroProvider>
    );
};

export default App;