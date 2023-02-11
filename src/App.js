import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Create from './components/Create';
import BoxSetting from './components/BoxSetting';
import ResetPin from './components/ResetPin';


import { useState } from 'react';

function App() {
  const [alreadyAlert, setAlreadyAlert] = useState(null)
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<Home alreadyAlert={alreadyAlert} setAlreadyAlert={setAlreadyAlert}/>}/>
        <Route path='/safeBox/:id' element={<BoxSetting />}/>
        <Route path='/addBox' element={<Create/>}/>
        <Route path='/resetPIN/:id' element={<ResetPin/>}/>
      </Routes>
    </div>
  );
}

export default App;
