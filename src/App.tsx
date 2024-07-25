import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AllFilms from './Components/AllFilms'
import FilmById from './Components/FilmByID'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/film-by-id' element={<FilmById/>} />
        <Route path='/all-films' element = {<AllFilms/>} />
      </Routes>

    </BrowserRouter>
        
  
  )
}

export default App
