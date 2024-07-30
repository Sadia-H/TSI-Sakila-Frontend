import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Film } from "../Types/types";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

import Navbar from "./Navbar";
import '../CSS/AllFilms.css';

export default function AllFilms() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [films, setFilms] = useState<Film[]>([]);
    const [loading, setLoading] = useState(true);
    const [favourites, setFavourites] = useState<Film[]>([]);
    // const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    // const [languages, setLanguages] = useState<string[]>([]);
    // const [sortOrder, setSortOrder] = useState<'asc'|'desc'>('asc');

    useEffect(() => {
        fetch(`${apiUrl}/partialFilms`)

        // fetch("http://localhost:8080/api/partialFilms")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("Failed to fetch list of films.", response.status);
                    return []; 
                }
            })
            .then((data: Film[]) => {
                console.log(data);
                setFilms(data);
                setLoading(false);
            })

        // fetch("http://localhost:8080/languages")
        //     .then(response => response.json())
        //     .then(data => setLanguages(data))
        //     .catch(error => console.log("Error: ", error));

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

    // const handleLanguageChange = (langauge:string) => {
    //     let updatedLanguages: string[] = [];

    //     //checks if language selected is already in selectedLanglist
    //     let languageFound = false;
    //     for(let i = 0; i<selectedLanguages.length; i++) {
    //         if(selectedLanguages[i] === langauge) {
    //             languageFound = true;
    //         } else {
    //             updatedLanguages.push(selectedLanguages[i]);
    //         }
    //     }

    //     if (!languageFound) {
    //         updatedLanguages.push(langauge);
    //     }
    //     setSelectedLanguages(updatedLanguages);

    // };
    
    return (
        <div className="pageContainer">
            <Navbar/>
            <div className="page">
                <h1>Browse All Films</h1>
                <div className="filmActorContainer">
                    {/* loops through films array */}
                    {films.map(film => (
                            <Link to={`/film/${film.filmId}`} key={film.filmId} className="filmActorBlockLink">
                                <div className="filmActorBlock" >
                                    <button  
                                            className = "favouriteButton"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleFavourite(film);
                                            }}>
                                            <FontAwesomeIcon
                                                icon={favourites.some(favourite => favourite.filmId === film.filmId) ? solidHeart : regularHeart}
                                                color={favourites.some(favourite => favourite.filmId === film.filmId) ? 'lightcoral' : 'grey'}
                                            />
                                    </button>
                                    <img className="imgPlaceholder" src="src\Images\movie_img_placeholder5.jpg"></img>
                                    <div className="filmDetails">
                                        <h2>{film.title}</h2>
                                        <p>{film.description}</p>
                                        <p>Release Year:  {film.releaseYear}</p>
                                    </div>
                                </div>
                            </Link>
                        
                    ))}
                </div>
            </div>
        </div>
    );
}
