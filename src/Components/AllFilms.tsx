import { useEffect, useState } from "react";
import { Film } from "../Types/types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

import Navbar from "./Navbar";
import '../CSS/AllFilms.css';

export default function AllFilms() {
    const [films, setFilms] = useState<Film[]>([]);
    const [loading, setLoading] = useState(true);
    const [favourites, setFavourites] = useState<Film[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc'|'desc'>('asc');

    useEffect(() => {
        fetch("http://localhost:8080/partialFilms")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("Failed to fetch list of films. Status:", response.status);
                    return []; 
                }
            })
            .then((data: Film[]) => {
                console.log(data);
                setFilms(data.splice(0, 20));
                setLoading(false);
            })

        fetch("http://localhost:8080/languages")
            .then(response => response.json())
            .then(data => setLanguages(data))
            .catch(error => console.log("Error: ", error));

        const savedFavourites = localStorage.getItem('favourites');
        if (savedFavourites) {
            setFavourites(JSON.parse(savedFavourites));
        }

    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const toggleFavourite = (film: Film) => {
        let isFavourite = false;
        const updatedFavourites = [];

        //checks if the film is already in favourites
        for (let i = 0; i<favourites.length; i++) {
            if(favourites[i].filmId === film.filmId) {
                isFavourite = true;
            } else {
                updatedFavourites.push(favourites[i]);
            }
        }

        //if selected film is not a favourite already
        if(!isFavourite) {
            updatedFavourites.push(film);
        }

        setFavourites(updatedFavourites)
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));

    }

    // //const isFilmFavourite = favourites.some(favouriteFilm => favouriteFilm.filmId === film.filmId);
    // const heartIcon = isFilmFavourite ? solidHeart : regularHeart;
    // const heartColor = isFilmFavourite ? 'lightcoral' : 'grey'
    
    

    return (
        <div>
            <Navbar/>
            <h1>All Films</h1>
            <div className="filmActorContainer">
                {films.map(film => (
                
                        
                        <Link to={`/film/${film.filmId}`} key={film.filmId} className="filmActorBlockLink">
                            <div className="filmActorBlock" >
                                {film.title}
                                <button  
                                    className = "favouriteButton"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavourite(film);
                                    }}>
                                    <FontAwesomeIcon
                                        icon={favourites.some(fav => fav.filmId === film.filmId) ? solidHeart : regularHeart}
                                        color={favourites.some(fav => fav.filmId === film.filmId) ? 'lightcoral' : 'grey'}
                                    />
                                </button>
                                <p> 
                                    {film.description}
                                </p>
                                <p>Release Year: {film.releaseYear}</p>
                            </div>
                        </Link>
                    
                 ))}
            </div>
        </div>
    );
}
