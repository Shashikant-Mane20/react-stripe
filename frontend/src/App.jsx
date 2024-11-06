import React from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Success from './components/Success'
import Cancel from './components/Cancel'

function App() {
  

  return (
    
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/cancel' element={<Cancel/>}/>
      </Routes>
    </div>
    
  )
}

export default App
