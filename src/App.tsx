import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AllFilms from './Components/AllFilms'
import FilmById from './Components/FilmByID'
import AllActors from './Components/AllActors'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/all-films' element = {<AllFilms/>} />
        <Route path='/film/:filmId' element={<FilmById/>} />
        <Route path='/all-actors' element = {<AllActors/>} />

      </Routes>

    </BrowserRouter>
        
  
  )
}

export default App
