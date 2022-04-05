import logo from './logo.svg';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import './App.css';
import Movies from './components/Movies';
import Favourites from './components/Favourite';
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Movies />} render={() => (
          <>
            <Banner />
            <Movies />
          </>
        )} />
        <Route path='/favourites' element={<Favourites />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
