import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function Login() {
    let [mail, setMail] = useState("")
    let [password, setPassword] = useState("")

    let redirect = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("user")) {
            if (JSON.parse(localStorage.getItem("user")).email) {
                redirect("/");
            }
        }
    })


    async function handleClk(e) {
        e.preventDefault()
        let usr = await fetch("http://localhost:8000/login", {
            method: "post",
            body: JSON.stringify({ email: mail, password: password }),
            headers: {
                "Content-type": "application/json"
            }
        })
        usr = await usr.json()

        if (usr) {
            console.log(usr)
            localStorage.setItem("user", JSON.stringify(usr.usr));
            localStorage.setItem("token", JSON.stringify(usr.auth))
            redirect("/");
        }
    }

    return (<>
        <h1>
            Login
        </h1>
        <form>

            <label htmlFor="email">Enter your email</label>
            <input value={mail} onChange={(e) => {
                setMail(e.target.value)
            }} type="email" name="email" id="email"></input>

            <label htmlFor="password">Enter the password</label>
            <input value={password} onChange={(e) => {
                setPassword(e.target.value)
            }} type="password" id="password" name="password"></input>

            <button onClick={handleClk}>Login</button>
        </form >
    </>);
}

export default Login;