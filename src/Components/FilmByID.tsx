import { useState, useEffect } from "react";
import Navbar from "./Navbar";

interface Film {
    title: string;
}

export default function FilmById() {
    const [film, setFilm] = useState<Film | null>(null); 
    const [loading, setLoading] = useState(true);
    const filmId = 5;

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const response = await fetch(`http://localhost:8080/partialFilms/${filmId}`);
                if (response.ok) {
                    const data: Film = await response.json();
                    setFilm(data);
                } else {
                    console.error("Failed to fetch film. Status:", response.status);
                    setFilm(null);
                }
            } catch (error) {
                console.error("Error fetching film:", error);
                setFilm(null);
            } finally {
                setLoading(false); 
            }
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





