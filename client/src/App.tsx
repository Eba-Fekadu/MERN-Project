import {BrowserRouter, Routes, Route} from 'react-router-dom';
import List from './pages/List';
import Statistics from './pages/statistics';
import Admin from './pages/Admin';

export default function App() {
  return <BrowserRouter>
  <Routes> 
    <Route path='/' element={<List />} />
    <Route path='/stats' element={<Statistics />} />
    <Route path='/admin' element={<Admin />} />
  </Routes>
  </BrowserRouter>
}
