import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import MyPin from './pages/MyPin';
import AdminUserPins from './pages/AdminUserPins'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/my-pins' element={<MyPin/>}/>
      <Route path='/my-pins' element={<MyPin/>} />
      <Route path='/admin' element={<AdminUserPins />} />
    </Routes>
  );
}

export default App;
