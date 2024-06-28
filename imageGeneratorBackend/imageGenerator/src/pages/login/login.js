
import PointsContext from '../../context/pointsContext.js';
import NavBar from "../common/navBar/navBar.js";
import {useState, useContext} from "react";
import './login.css';

const Login = () => {
    const {login} = useContext(PointsContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateEmail = (email) => {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        return emailPattern.test(email);
    };
    
    const handleClick = async() => {
        let valid = true;

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        } else {
            setEmailError('');
        }

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (!valid) {
            return;
        }

        if(!email && !password){
            return;
        }
        const res = await fetch(`api/v1/auth/login`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({email, password})
        });
        const data = await res.json();
        console.log(data);
        if(data.status === "success"){
            localStorage.setItem("authorization", data.data.token);
            login();
        }
    }

    return (
        <div>
            <NavBar page='login' />
            <div className='login-main-container'>
                <h3>Login</h3>
                <div className="myinput">
                    <p>Email:</p>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {emailError && <span className="error">{emailError}</span>}
                </div>
                <div className="myinput">
                    <p>Password:</p>
                    <input
                        type="password"
                        value={password}
                        placeholder="enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {passwordError && <span className="error">{passwordError}</span>}
                    {login.isLoggedin?<span ></span>:<span>Please try again</span>}
                </div>
                <button onClick={handleClick}>Login</button>
            </div>
        </div>    
        )
}

export default Login;