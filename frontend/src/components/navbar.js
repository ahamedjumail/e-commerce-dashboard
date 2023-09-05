import { NavLink, useNavigate } from 'react-router-dom'
import "./navbar.css"

function Navbar() {

    let redirect = useNavigate();
    let usr = false;
    if (localStorage.getItem("user")) {
        if (JSON.parse(localStorage.getItem("user")).email) {
            usr = JSON.parse(localStorage.getItem("user"))
        }

    }
    function logot() {
        localStorage.clear();
        redirect("/")

    }

    return (
        <nav id="navbr">
            <img id="logo" alt="logo" src="https://image.spreadshirtmedia.com/image-server/v1/designs/1021620159,width=178,height=178.png"></img>
            {usr ? <>
                <NavLink className="lnks" to="/">home</NavLink>
                <NavLink className="lnks" to="/addproduct">addproducts</NavLink>
                <NavLink className="lnks" to="/login" onClick={logot} >logout</NavLink>
            </> : <>
                <NavLink className="lnks" to="/login">login</NavLink>
                <NavLink className="lnks" to="/register">register</NavLink>
            </>
            }

        </nav>

    );
}


export default Navbar