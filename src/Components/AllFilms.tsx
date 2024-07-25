import { useEffect, useState } from "react";

interface Film {
    title: string;
    
}


export default function AllFilms () {
    const[films, setFilms] = useState<Film[]>([]);

useEffect(() => {
    fetch('http://localhost:8080/films')
    .then(response => response.json())
    .then(data => setFilms(data))
    .catch(error => console.error('Error fetching data:', error));

}, []); //array to run useEffect only once

return (
    <div>
        <h1>hello</h1>
        <ul>
            {films.map((film, index) => (
                <li key={index}>{film.title}</li>
            ))}
        </ul>
    </div>
    );
}