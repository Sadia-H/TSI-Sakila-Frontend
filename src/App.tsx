import './App.css'
import AllActors from './Components/AllActors'
import AllFilms from './Components/AllFilms'
import FilmById from './Components/FilmByID'
import Navbar from './Components/Navbar'

function App() {
  const filmId = 1; 
  return (
    <>
      {/* <h1>hello</h1> */}
      {/* <Navbar/> */}
      {/* <AllActors/> */}
      {/* <AllFilms/> */}
      {/* <FilmById filmId={filmId} /> */}
      <FilmById />
        
    </>
  )
}

export default App
