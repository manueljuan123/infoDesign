import React from 'react';
import { TramosCliente } from './pages/TramosCliente';
import { Tramos } from './pages/Tramos';
import { Cliente } from './pages/Cliente/Cliente';
import { MySideNav } from './components/MySideNav'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  // Inicializamos valores predeterminados del DateRangePicker
  localStorage.setItem('startDate', '2010/01/01');
  localStorage.setItem('endDate', '2010/02/26');

  return (
    <div className='container'>
      <Router>
        <MySideNav />
        <Routes>
          <Route path='/' element={<Tramos />} />
          <Route path='/tramos' element={<Tramos />} />
          <Route path='/tramos-cliente' element={<TramosCliente />} />
          <Route path='/cliente' element={<Cliente />} />
        </Routes>
      </Router>
      <main>
      </main>
    </div>
  );
}


export default App;
