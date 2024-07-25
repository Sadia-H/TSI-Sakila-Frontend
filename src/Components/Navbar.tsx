import '../CSS/Navbar.css';


export default function Navbar() {
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
                <a href="/film-by-id">Film by Id</a>
                <a href="/all-films">All Films</a>
            </div>
          </div>
        </div>

    )   
}