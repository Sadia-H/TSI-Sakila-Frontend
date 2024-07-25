import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {Film} from "../Types/filmTypes";


export default function FilmById() {
    const [film, setFilm] = useState<Film | null>(null); 
    const [loading, setLoading] = useState(true);
    const filmId = 5;

    useEffect(() => {
        const fetchFilm = () => {
            fetch(`http://localhost:8080/partialFilms/${filmId}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.error("Failed to fetch film. Status:", response.status);
                        return null; // Return null if response is not ok
                    }
                })
                .then((data: Film | null) => {
                    setFilm(data);
                })
                .catch(error => {
                    console.error("Error fetching film:", error);
                    setFilm(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        fetchFilm();
    }, [filmId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar/>
            {film ? <h1>{film.title}</h1> : <p>Film not found</p>}
        </div>
    );
}





