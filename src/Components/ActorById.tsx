import { Link, useParams } from "react-router-dom";
import { Actor } from "../Types/types";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import '../CSS/AllFilms.css';
import '../CSS/ActorById.css';

export default function ActorById() {
    const apiUrl = import.meta.env.VITE_API_URL;

    // extracts id from url
    const { id } = useParams<{ id: string }>();
    const [actor, setActor] = useState<Actor | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActor = () => {
            fetch(`${apiUrl}/actor-responses/${id}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.error("Failed to fetch actor. Status:", response.status);
                        return null; 
                    }
                })
                .then((data: Actor | null) => {
                    setActor(data);
                    setLoading(false);
                })
        };
    
        fetchActor();
    }, [id]);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pageContainer">
            <Navbar />
            <div className="page">
                {actor ? (
                    <div>
                        <div className="actorTitle">
                            <h1>{actor.firstName} {actor.lastName}</h1>
                        </div>
                        <div className="subheading">Starred in:</div>
                        <div className="filmActorContainer">
                            {actor.films.length > 0 ? (
                                actor.films.map((film) => (
                                    <Link to={`/film/${film.filmId}`} key={film.filmId} className="filmActorBlockLink">
                                        <div className="filmActorBlock">
                                            <div className="filmDetails">
                                                <h2>{film.title}</h2>
                                                <p>{film.description}</p>
                                                <p>Release Year: {film.releaseYear}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p>This actor has not starred in any films.</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>Actor not found</p>
                )}
            </div>
        </div>
    );
}
