import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Film } from "../Types/types";
import '../CSS/FavouriteFilms.css';

export default function FavouriteFilms () {
    const [favourites, setFavourites] = useState<Film[]>([]);

    useEffect(() => {
        const savedFavourites = localStorage.getItem('favourites');
        if(savedFavourites) {
            setFavourites(JSON.parse(savedFavourites));
        } else {
            setFavourites([]);
        }
    }, []);


    return (
        <div className="pageContainer">
            <Navbar />
            <div className="page">
                <h1>Favourite Films</h1>
                <div className="filmActorContainer">
                    {favourites.length > 0 ? (
                        favourites.map(film => (
                            <div key={film.filmId} className="filmActorBlock">
                                <Link to={`/film/${film.filmId}`} className="filmActorBlockLink">
                                    <img className="imgPlaceholder" src="src/Images/movie_img_placeholder5.jpg" alt={film.title} />
                                    <div className="filmDetails">
                                        <h2>{film.title}</h2>
                                        <p>{film.description}</p>
                                        <p>Release Year: {film.releaseYear}</p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No favourite films found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};