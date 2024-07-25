import { useEffect, useState } from "react";
import { Film } from "../Types/types";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import '../CSS/AllFilms.css';

export default function AllFilms() {
    const [films, setFilms] = useState<Film[]>([]);
    const [loading, setLoading] = useState(true);
    

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
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar/>
            <h1>All Films</h1>
            <div className="filmContainer">
                {films.map(film => (
                    <div key={film.filmId} className="filmBlock">
                        <Link to={`/film/${film.filmId}`}>
                            {film.title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
