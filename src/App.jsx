import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/Home';
import EditTask from './components/EditTask';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/edit/:id' element={<EditTask />} />
      </Routes>
    </Router>
  )
};

export default App
