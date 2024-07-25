import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {Film} from "../Types/types";
import { useParams } from "react-router-dom";


export default function FilmById() {
    const {filmId} = useParams<{filmId: string}>();
    const [film, setFilm] = useState<Film | null>(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilm = () => {
            fetch(`http://localhost:8080/partialFilms/${filmId}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.error("Failed to fetch film. Status:", response.status);
                        return null; 
                    }
                })
                .then((data: Film | null) => {
                    setFilm(data);
                    setLoading(false);
                })
        };

        fetchFilm();
    }, [filmId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            {film ? (
                <div>
                    <h1>{film.title}</h1>
                    <p>{film.releaseYear}</p>
                </div>
            ) : (
                <p>Film not found</p>
            )}
        </div>
    );
}





