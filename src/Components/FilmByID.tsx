import { useState, useEffect } from "react";

interface Film {
    title: string;
}

export default function FilmById() {
    const [film, setFilm] = useState<Film | null>(null); 
    const [loading, setLoading] = useState(true);
    const filmId = 1;

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const response = await fetch(`http://localhost:8080/partialFilms/${filmId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
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
            {film ? (
                <div>
                    <h1>{film.title}</h1>
                </div>
            ) : (
                <div>Film not found</div>
            )}
        </div>
    );
}





