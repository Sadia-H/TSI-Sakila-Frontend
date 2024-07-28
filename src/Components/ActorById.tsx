import { Link, useParams } from "react-router-dom";
import { Actor } from "../Types/types";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import '../CSS/AllFilms.css';
import '../CSS/ActorById.css';


export default function ActorById () {
    const {id} = useParams<{id: string}>();
    const [actor, setActor] = useState<Actor | null>(null);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActor = () => {
            fetch(`http://localhost:8080/actor-responses/${id}`)
            .then(response => {
                if(response.ok) {
                    return response.json()
                } else {
                    console.log("Failed to fetch actor: ", response.status);
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
        return <div>Loading...</div>
    }

    return (
        <div>
            <Navbar/>
            {actor ? (
                <div>
                    <h1>{actor.firstName}</h1>
                    <h1>{actor.lastName}</h1>
                    <div className="subheading">Starred in:</div>
                        <div className="filmList">
                            {actor.films.map((film) => (
                                <div key={film.filmId}>
                                <Link to={`/film/${film.filmId}`}>
                                    {film.title}
                                </Link>
                                </div>
                            ))}
                        </div>
                    </div>
            ) : (
                <p>Actor not found</p>
            
            )}
        </div>
    )

}