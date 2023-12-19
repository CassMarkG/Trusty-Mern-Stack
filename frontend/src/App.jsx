import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Register from './pages/RegisterPage.jsx';
import Login from './pages/LoginPage.jsx';

function App() {

  return (
    <>
      <Router>
        <div className="headerContainer">
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App;
