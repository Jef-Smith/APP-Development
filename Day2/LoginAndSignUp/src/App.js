import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegistration from './components/LoginRegistration';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LoginRegistration />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;