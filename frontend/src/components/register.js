import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




function Register() {
    let redirect = useNavigate();

    let [name, setName] = useState("");
    let [mail, setMail] = useState("");
    let [password, setPassword] = useState("");
    useEffect(() => {
        if (localStorage.getItem("user")) {
            if (JSON.parse(localStorage.getItem("user")).email) {
                redirect("/");
            }

        }
    })

    async function handleClk(e) {
        e.preventDefault()
        let usr = await fetch("http://localhost:8000/register", {
            method: "post",
            body: JSON.stringify({
                name: name,
                email: mail,
                password: password
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        usr = await usr.json()
        if (usr) {
            localStorage.setItem("user", JSON.stringify(usr.u1))
            localStorage.setItem("token", JSON.stringify(usr.auth))
            redirect("/")
        }

    }


    return (<>
        <h1>Register</h1>
        <form>
            <label htmlFor="name">Enter the user name</label>
            <input value={name} type="text" id="name" onChange={(e) => {
                setName(e.target.value)
            }}></input>

            <label htmlFor="mail">Enter the email id</label>
            <input value={mail} type="email" id="mail" onChange={(e) => {
                setMail(e.target.value)
            }}></input>

            <label htmlFor="password">Enter the password</label>
            <input value={password} type="password" id="password" onChange={(e) => {
                setPassword(e.target.value)
            }}></input>

            <button onClick={handleClk}>Register</button>
        </form>
    </>
    );
}

export default Register;