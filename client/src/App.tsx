import {BrowserRouter, Routes, Route} from 'react-router-dom';
import List from './pages/List';
import Statistics from './pages/Statistics';
import Admin from './pages/Admin';
import Header from './component/Header';

export default function App() {
  return <BrowserRouter>
  <Header/>
  <Routes> 
    <Route path='/' element={<List />} />
    <Route path='/stats' element={<Statistics />} />
    <Route path='/admin' element={<Admin />} />
  </Routes>
  </BrowserRouter>
}
