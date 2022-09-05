import { useState } from 'react';
import Home from './components/Home/Home';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CalenderPage from './components/CalenderPage/CalenderPage';

function App() {
 
  return (
    <div className="App">
      <div className="header">
        <p className='heading'>MY HABIT TRACKER</p>
      </div>
      <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='/calender' element={<CalenderPage/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
