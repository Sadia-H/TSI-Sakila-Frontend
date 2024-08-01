import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/AddFilm.css'
import Navbar from './Navbar'
import { Language } from '../Types/types';


export default function AddFilm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [languages, setLanguages] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');
    const [length, setLength] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    // const [rating, setRating] = useState("");
    // const [specialFeatures, setSpecialFeatures] = useState("");

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/languages`)
            .then(response => response.json())
            .then((data: Language[]) => setLanguages(data))
            .catch(error => console.error("Error fetching languages: ", error));
    }, []);



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

        setSuccessMessage("Film added successfully!");
        setTimeout(() => {
            // navigate(`/actor/${id}`);
        }, 1000); 
    }


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
                        {descriptionError && 
                        <div className="errorMessage">
                            {descriptionError}
                        </div>}
                      
                </label>

                <div className='language'>
                    <h3>Language</h3>
                    <div className="radio-group">
                        {languages.map((language) => (
                            <label key={language.id}>
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

                <label>Release Year
                        <input 
                            type="text" 
                            placeholder="E"
                            value={releaseYear} 
                            onChange = {(e) => setReleaseYear(e.target.value)}  
                        />
                        
                </label>

               
                <label>Length
                        <input 
                            type="text" 
                            placeholder="Length"
                            value={length} 
                            onChange = {(e) => setLength(e.target.value)}  
                        />
                       
                </label>



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