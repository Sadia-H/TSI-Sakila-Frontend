import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import {Film} from "../Types/types";
import '../CSS/FilmById.css';


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
                        console.error("Failed to fetch film.", response.status);
                        return null; 
                    }
                })
                .then((data: Film | null) => {
                    setFilm(data);
                    setLoading(false);
                })
        };

        fetchFilm();
    }, [filmId]); //reruns when the filmId changes

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pageContainer">
            <Navbar />
            {film ? (
                <div className="filmByIdPage">
                    <div className="filmDetails">
                        <h1>{film.title}</h1>
                        <p>{film.description}</p>
                        <p><span>Release Year:</span> {film.releaseYear}</p>
                        <p><span>Language:</span> {film.language.name}</p>
                        <p><span>Length:</span> {film.length} Minutes</p>
                        <p><span>Rating:</span> {film.rating}</p>
                        <p><span>Special Features:</span> {film.specialFeatures}</p>
                    </div>
                    <div className="cast">
                        {film.cast.map((actor) => (
                            <div key={actor.id}>
                                <Link to={`/actor/${actor.id}`}>
                                    {actor.firstName} {actor.lastName}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Film not found</p>
            )}
        </div>
    );
};