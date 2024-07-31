import { FormEvent, useState } from "react"
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";



export default function AddActor() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = (event: FormEvent<HTMLFormElement>):void => {
        event.preventDefault();

        fetch(`${apiUrl}/actors` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName
            }),
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error('Network error.')
            }
            return response.json();
        })
        .then((data) => {
            const id = data.id;
            setSuccessMessage("Actor added successfully!");
            setTimeout(() => {
                navigate(`/actor/${id}`);
            }, 1000); 
        })
        .catch((error) => {
            console.log("Failed to add actor", error.message);
        })


    };



    return(
        <div>
            <Navbar/>
            <h1>Add Actor</h1>
            <form onSubmit={handleSubmit}>
                <label>First Name
                    <input 
                        type="text" 
                        placeholder="First Name"
                        value={firstName} 
                        onChange = {(e) => setFirstName(e.target.value)}  
                    />
                </label>
                <label>Last Name
                <input 
                        type="text" 
                        placeholder="Last Name"
                        value={lastName} 
                        onChange = {(e) => setLastName(e.target.value)}  
                    />
                </label>
                <button type="submit">Submit</button>
            </form>

            {successMessage && (
                    <div>
                        <p>{successMessage}</p>
                    </div>
                )}
        
        </div>
    )
}