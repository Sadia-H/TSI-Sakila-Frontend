import { useEffect, useState } from "react";
import { Actor } from "../Types/types";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import '../CSS/AllActors.css';


export default function AllActors () {
    const [actors, setActors] = useState<Actor[]>([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // makes HTTP request 
         fetch(`${apiUrl}/actor-responses`)

        // fetch("http://localhost:8080/api/actor-responses")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("Failed to fetch list of actors.", response);
                    return [];
                }
            })
            .then((data: Actor[]) => {
                console.log(data);
                setActors(data);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }


    return (
            <div className="pageContainer">
                <Navbar/>
                <div className="page">
                    <h1>All Actors</h1>
                    <div className="actorContainer">
                        {actors.map(actor => (
                            <Link 
                                to={`/actor/${actor.id}`} 
                                key={actor.id} 
                                className="filmActorBlockLink"
                                data-testid={`actor-link-${actor.id}`}
                            >
                            <div className="actorBlock" data-testid={`actor-link-${actor.id}`}>
                                {actor.firstName} {actor.lastName}
                            </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
    )
}