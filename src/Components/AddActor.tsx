import { FormEvent, useState } from "react"
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import '../CSS/AddActor.css';


export default function AddActor() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const validateInputs = () => {
        let isValid = true;
        if (firstName.trim() === "") {
            setFirstNameError("Please enter the first name.");
            isValid = false;
        } else {
            setFirstNameError("");
        }

        if (lastName.trim() === "") {
            setLastNameError("Please enter the last name.");
            isValid = false;
        } else {
            setLastNameError("");
        }
        return isValid;
    }




    const handleSubmit = (event: FormEvent<HTMLFormElement>):void => {
        event.preventDefault();

        if(!validateInputs()) {
            return;
        }

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
            setSuccessMessage("Actor added!");
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
                    {firstNameError && 
                    <div className="errorMessage">
                        {firstNameError}
                    </div>}

                </label>
                <label>Last Name
                <input 
                        type="text" 
                        placeholder="Last Name"
                        value={lastName} 
                        onChange = {(e) => setLastName(e.target.value)}  
                    />
                     {lastNameError && 
                     <div className="errorMessage">
                        {lastNameError}
                     </div>}
                </label>
                <button type="submit" id="addActorButton">Add Actor</button>
            </form>

            {successMessage && (
                    <div>
                        <p>{successMessage}</p>
                    </div>
                )}
        
        </div>
    )
}