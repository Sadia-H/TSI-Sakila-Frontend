import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/AddFilm.css'
import Navbar from './Navbar'
import { Language } from '../Types/types';
import { Actor } from '../Types/types';


export default function AddFilm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [length, setLength] = useState("");
    const [rentalDuration, setRentalDuration] = useState("");
    const [rentalRate, setRentalRate] = useState("");
    const [replacementCost, setReplacementCost] = useState("");


    const [languages, setLanguages] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');

    //To select actors
    const [actors, setActors] = useState<Actor[]>([]);
    const [actorIds, setActorIds] = useState<number[]>([]);
    const [actorSearch, setActorSearch] = useState("");
    const [filteredActors, setFilteredActors] = useState<Actor[]>([]);
    const [selectedActors, setSelectedActors] = useState<Actor[]>([]);
    const [showSearchResults, setShowSearchResults] = useState(true);

    //Messages for errors or successful submission
    const [successMessage, setSuccessMessage] = useState("");
    const [titleError, setTitleError] = useState("");
    //const [descriptionError, setDescriptionError] = useState("");

    // const [rating, setRating] = useState("");
    // const [specialFeatures, setSpecialFeatures] = useState("");

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/languages`)
            .then(response => response.json())
            .then((data: Language[]) => {
                setLanguages(data);
            })
            .catch(error => console.error("Error fetching languages: ", error));

        fetch(`${apiUrl}/actor-responses`)
            .then(response => response.json())
            .then((data: Actor[]) => {
                console.log("Actor data: ", data);
                setActors(data);
                setFilteredActors(data); 
            })
            .catch(error => console.error("Error fetching actors: ", error));

    }, [apiUrl]);

    useEffect(() => {
        setFilteredActors(
            actors.filter(actor =>
                `${actor.firstName} ${actor.lastName}`.toLowerCase().includes(actorSearch.toLowerCase())
            )
        );
    }, [actorSearch, actors]);


    const validateInputs = () => {
        let isValid = true;
        if (title.trim() === "") {
            setTitleError("Please enter the film title.");
            isValid = false;
        } else {
            setTitleError("");
        }
        return isValid;
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>):void => {
        event.preventDefault();

        if(!validateInputs()) {
            return;
        }

        const selectedLanguageId = languages.find(lang => lang.name === selectedLanguage)?.languageId;

        const filmData = {
            title,
            description,
            releaseYear: parseInt(releaseYear, 10),
            languageId: selectedLanguageId,
            rentalDuration: parseInt(rentalDuration, 10),
            rentalRate: parseFloat(rentalDuration),
            length: parseInt(length, 10),
            replacementCost: parseFloat(replacementCost),
            actorIds
        };

        console.log("Submitted film data:", filmData);

        fetch(`${apiUrl}/films`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filmData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Successfully added film: ", data);
            const filmId = data.filmId;
            setSuccessMessage("Film added!");
            setTimeout(() => {
                navigate(`/film/${filmId}`);
            }, 1000); 
        })
        .catch(error => {
            console.error("Error:", error);
        })
    }

   

    const handleActorSelect = (actor: Actor) => {

        //if actor has not already been selected, added to array
        if (!actorIds.includes(actor.id)) {
            setActorIds([...actorIds, actor.id]);
            setSelectedActors([...selectedActors, actor]);

            // Hide search results when actor is selected
            setShowSearchResults(false);
        }

    };

    const handleActorRemove = (actorId: number) => {
        setActorIds(actorIds.filter(id => id !== actorId));
        setSelectedActors(selectedActors.filter(actor => actor.id !== actorId));
    };

    const handleSearchBarFocus = () => {
        setShowSearchResults(true);
    };

    return(
        <div>
            <Navbar/>
            <h1>Add Film</h1>
            <form onSubmit={handleSubmit}>
                <label>Title
                        <input 
                            type="text" 
                            placeholder="Title"
                            value={title} 
                            onChange = {(e) => setTitle(e.target.value)}  
                        />
                        {titleError && 
                        <div className="errorMessage">
                            {titleError}
                        </div>}
                </label>

                <label className='descriptionLabel'>Description
                        <textarea 
                            placeholder="Description"
                            value={description} 
                            onChange = {(e) => setDescription(e.target.value)}  
                        />
                        {/* {descriptionError && 
                        <div className="errorMessage">
                            {descriptionError}
                        </div>} */}
                      
                </label>

                <label>Release Year
                        <input 
                            type="number" 
                            placeholder="Year"
                            value={releaseYear} 
                            onChange = {(e) => setReleaseYear(e.target.value)}  
                        />
                        
                </label>
               
                <label>Length
                        <input 
                            type="number" 
                            placeholder="Length"
                            value={length} 
                            onChange = {(e) => setLength(e.target.value)}  
                        />
                       
                </label>

                <label>
                    Rental Duration
                    <input 
                        type="number"
                        placeholder="Rental Duration"
                        value={rentalDuration} 
                        onChange={(e) => setRentalDuration(e.target.value)}  
                    />
                </label>

                <label>
                    Rental Rate
                    <input 
                        type="number"
                        step="0.01"
                        placeholder="Rental Rate"
                        value={rentalRate} 
                        onChange={(e) => setRentalRate(e.target.value)}  
                    />
                </label>

                <label>
                    Replacement Cost
                    <input 
                        type="number"
                        step="0.01"
                        placeholder="Replacement Cost"
                        value={replacementCost} 
                        onChange={(e) => setReplacementCost(e.target.value)}  
                    />
                </label>


                <div>
                    <h3>Language</h3>
                    <div className="radio-group">
                        {languages.map((language) => (
                            <label key={language.languageId}>
                                <input
                                    type="radio"
                                    name="language"
                                    value={language.name}
                                    checked={selectedLanguage === language.name}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                />
                                {language.name}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3>Actors</h3>
                    <input
                        type="text"
                        placeholder="Search for actors"
                        value={actorSearch}
                        onChange={(e) => setActorSearch(e.target.value)}
                        onFocus={handleSearchBarFocus}
                    />
                    {showSearchResults && actorSearch && (
                        <div className="actor-list">
                            {filteredActors.map((actor) => (
                                <div 
                                    key={actor.id} 
                                    onClick={() => handleActorSelect(actor)}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    {actor.firstName} {actor.lastName}
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {selectedActors.length > 0 && (
                        <div>                            
                                {selectedActors.map((actor) => (
                                     <div key={actor.id} className="selected-actor">
                                        {actor.firstName} {actor.lastName}
                                        <span className="remove-actor" onClick={() => handleActorRemove(actor.id)}>x</span>
                                     </div>
                                ))}
                        
                        </div>
                    )}
                </div>




                <button type="submit">Add Film</button>
            </form>
            {successMessage && (
                    <div>
                        <p>{successMessage}</p>
                    </div>
            )}
        </div>
    )
}