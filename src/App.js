import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import HomePage from './components/Homepage/HomePage';
import Header from './components/Header/Header';
import Main from './components/MainPage';

function App() {
  return (
    <>
    <Router>
    <Header/>
    <Routes>
    <Route  path='/' element={<HomePage/>} />
    <Route path='/task' element={<Main/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
