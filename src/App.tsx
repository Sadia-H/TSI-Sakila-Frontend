import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AllFilms from './Components/AllFilms'
import FilmById from './Components/FilmByID'
import AllActors from './Components/AllActors'
import ActorById from './Components/ActorById'
import FavouriteFilms from './Components/FavouriteFIlms'
import AddActor from './Components/AddActor'
import AddFilm from './Components/AddFilm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/all-films' element = {<AllFilms/>} />
        <Route path='/film/:filmId' element={<FilmById/>} />
        <Route path='/all-actors' element = {<AllActors/>} />
        <Route path='/actor/:id' element={<ActorById/>} />
        <Route path='/favourite-films' element={<FavouriteFilms/>}/>
        <Route path='/add-actor' element={<AddActor/>}/>
        <Route path='/add-film' element={<AddFilm/>}/>
      </Routes>
    </BrowserRouter>
        
  
  )
}

export default App
