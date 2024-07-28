import { Link, useParams } from "react-router-dom";
import { Actor } from "../Types/types";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import '../CSS/AllFilms.css'; // Ensure this CSS includes styling for the film list
import '../CSS/ActorById.css'; // Ensure this CSS includes styling for the actor details page

export default function ActorById() {
    const { id } = useParams<{ id: string }>();
    const [actor, setActor] = useState<Actor | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActor = async () => {
            try {
                const response = await fetch(`http://localhost:8080/actor-responses/${id}`);
                if (response.ok) {
                    const data: Actor = await response.json();
                    setActor(data);
                } else {
                    console.log("Failed to fetch actor: ", response.status);
                    setActor(null); // Ensure actor is null if the fetch fails
                }
            } catch (error) {
                console.error("Error fetching actor:", error);
                setActor(null);
            } finally {
                setLoading(false);
            }
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
                            {actor.films.map((film) => (
                                <Link to={`/film/${film.filmId}`} key={film.filmId} className="filmActorBlockLink">
                                    <div className="filmActorBlock">
                                        {/* <img className="imgPlaceholder" src="movie_img_placeholder5.jpg" alt={film.title} /> */}
                                        <div className="filmDetails">
                                            <h2>{film.title}</h2>
                                            <p>{film.description}</p>
                                            <p>Release Year: {film.releaseYear}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Actor not found</p>
                )}
            </div>
        </div>
    );
}
