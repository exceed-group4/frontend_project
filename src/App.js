import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Create from './components/Create';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<Home/>}/>
        {/* <Route path='/safeBox/:id' element={}/> */}
        <Route path='/addBox' element={<Create/>}/>
      </Routes>
    </div>
  );
}

export default App;
