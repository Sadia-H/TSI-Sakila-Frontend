import '../CSS/Navbar.css';
import { Link } from 'react-router-dom';


export default function Navbar () {
    return (
        <div>
          <div className="navbarContainer">
            <div className="navLogo">
                <a id="sakilaLogo" href="/all-films">SAKILA</a> 
            </div>
            {/* <div id="searchBar">
                <input type="search" placeholder="Search"/>
            </div> */}

            <div className="webPages">
                <Link to ="/all-films">All Films</Link>
                <Link to ="/all-actors">All Actors</Link>
                <Link to ="/add-film">Add Film</Link>
                <Link to ="/add-actor">Add Actor</Link>
                <Link to ="/favourite-films">Favourite Films</Link>
            </div>
          </div>
        </div>

    );
}

