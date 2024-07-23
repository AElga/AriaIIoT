import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css';


const Login = () => {
    const [apiResponse, setApiResponse] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const callAPI = () => {
        fetch("http://localhost:5000/log")
            .then(res => res.text())
            .then(res => setApiResponse(res))
            .catch(err => console.error("Fetch error: ", err));
    };

    useEffect(() => {
        callAPI();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Send the username and password to the backend for checking
        fetch('http://localhost:5000/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    navigate("/Home");
                } else {
                    console.error("Authentication failed");
					
                }
            })
            .catch(err => console.error("Fetch error: ", err));
    };

    return (
        <div className='Login'>
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3 large-font" style={{ color: "#ffffff" }}><span>Log In</span></h6>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Log In</h4>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="form-group">
                                                            <input
                                                                type="email"
                                                                name="username"
                                                                className="form-style"
                                                                placeholder="Email"
                                                                id="logemail"
                                                                autoComplete="off"
                                                                value={username}
                                                                onChange={(e) => setUsername(e.target.value)}
                                                            />
                                                            <i className="input-icon uil uil-at"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                className="form-style"
                                                                placeholder="Password"
                                                                id="logpass"
                                                                autoComplete="off"
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                            />
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <button type="submit" className="btn mt-4">Submit</button>
														
                                                        <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot Password?</a></p>
                                                        <p className="mb-0 mt-4 text-center"><a href="/SignUp" className="link">Create New Account</a></p>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
