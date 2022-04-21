import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss'
// import ReactDOM from 'react-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { AuthContext } from "../../context/AuthContext"

function Login() {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch({ type: "LOGIN", payload: user })
                // console.log(user)
                navigate("/")
                // ...
            })
            .catch((err) => {
                setError(true)
                // ..
            });
        // setError(true)
    }

    return (
        <div className="login">
            <form className="form" onSubmit={handleSubmit}>
                <input type="email" placeholder="email" className="input" onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="input" onChange={e => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
                {error && <span className="error">Wrong email or password</span>}
            </form>
        </div >
    );
}

export default Login;