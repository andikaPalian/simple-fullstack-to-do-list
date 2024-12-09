import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoWrapper from './components/TodoWrapper'
import './App.css'

const routes = (
  <Router>
    <Routes>
      <Route path='/' exact element={<TodoWrapper />} />
    </Routes>
  </Router>
)

function App() {
  return (
    <div className="App">
      {routes}
    </div>
  )
}

export default App
