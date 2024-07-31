import { FormEvent, useEffect, useState } from "react"
import Navbar from "./Navbar";


export default function AddActor() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
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
        .then(() => {
            setSuccessMessage("Actor has been added!");
            setTimeout(() => setSuccessMessage(""), 3000);
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
        {submitted && (
        <div>
          <h2>Submitted Information:</h2>
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
        </div>
    )}

{successMessage && (
                <div>
                    <p>{successMessage}</p>
                </div>
            )}
      
        </div>
    )
}