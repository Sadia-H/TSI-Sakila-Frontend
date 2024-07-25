import { useEffect, useState } from "react";
import { Actor } from "../Types/types";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";


export default function AllActors () {
    const [actors, setActors] = useState<Actor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/actor-responses")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("Failed to fetch list of actors. Status: ", response);
                    return [];
                }
            })
            .then((data: Actor[]) => {
                console.log(data);
                setActors(data.splice(0,20));
            })
            .catch(error => {
                console.log("Error fetching actors: ", error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }


    return (
        <div>
            <Navbar/>
            <h1>All Actors</h1>
            <div className="actorContainer">
                {actors.map(actor => (
                    <div key={actor.id}>
                        <Link to={`/actor/${actor.id}`}>
                            {actor.firstName}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}