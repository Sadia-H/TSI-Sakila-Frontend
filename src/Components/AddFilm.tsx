import { FormEvent, useState } from 'react';
import '../CSS/AddFilm.css'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';


export default function AddFilm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [language, setLanguage] = useState("");
    const [length, setLength] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    // const [rating, setRating] = useState("");
    // const [specialFeatures, setSpecialFeatures] = useState("");

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

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

                <label>Description
                        <input
                            placeholder="Description"
                            value={description} 
                            onChange = {(e) => setTitle(e.target.value)}  
                        />
                        {titleError && 
                        <div className="errorMessage">
                            {titleError}
                        </div>}
                </label>

                <label>Release Year
                        <input 
                            type="text" 
                            placeholder="E"
                            value={releaseYear} 
                            onChange = {(e) => setTitle(e.target.value)}  
                        />
                        {titleError && 
                        <div className="errorMessage">
                            {titleError}
                        </div>}
                </label>

                <label>Language
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