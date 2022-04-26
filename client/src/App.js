import NavHeader from './components/NavHeader';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import './App.css';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <NavHeader />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
