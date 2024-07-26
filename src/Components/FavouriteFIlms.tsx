import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Film } from "../Types/types";

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
        <div>
           <Navbar/>
           <h1>Favourite Films</h1>
           <div className="filmActorContainer">
           {favourites.length > 0 ? (
                    favourites.map(film => (
                        <div key={film.filmId} className="filmActorBlock">
                            <Link to={`/film/${film.filmId}`} className="filmActorBlockLink">
                                {film.title}
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No favourite films found.</p>
                )}
           </div>
        </div>
    )
}