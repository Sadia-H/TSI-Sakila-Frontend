import { useEffect, useState } from "react";
import { Film } from "../Types/filmTypes";

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
                if (Array.isArray(data)) {
                    setFilms(data.splice(0,20));
                } else {
                    console.log("Unexpected response format:", data);
                }
            })
            .catch(error => {
                console.log("Error fetching list of films: ", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>All Films</h1>
            <ul>
                {films.map(film => (
                    <li key={film.id}>{film.title}</li>
                ))}
            </ul>
        </div>
    );
}
