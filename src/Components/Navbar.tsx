import '../CSS/Navbar.css';
import { Link } from 'react-router-dom';


export default function Navbar () {
    return (
        <div>
          <div className="navbarContainer">
            <div className="navLogo">
                <a id="sakilaLogo" href="/">SAKILA</a> 
            </div>
            <div id="searchBar">
                <input type="search" placeholder="Search"/>
            </div>

            <div className="webPages">
                <Link to ="/all-films">All Films</Link>
            </div>
          </div>
        </div>

    );
}

