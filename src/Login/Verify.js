import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css';

const Verify = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [showVerification, setShowVerification] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [verificationError, setVerificationError] = useState("");
    const navigate = useNavigate();
    
    const handleVerification = (event) => {
        event.preventDefault();
        setVerificationError("");
        fetch('http://localhost:5000/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, code: verificationCode })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    navigate("/Home");
                } else {
                    setVerificationError(data.message || "Verification failed");
                }
            })
            .catch(err => setVerificationError("Fetch error: " + err));
    };

    return (
        <div className='Login body1'>
            <div className="section1">
                <div className="container">
                    <div className="row full-height1 justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section1 pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="h61 mb-0 pb-3 large1-font" style={{ color: "#ffffff" }}><span>Log In</span></h6>
                                <div className="card1-3d-wrap mx-auto">
                                    <div className={`card1-3d-wrapper ${showVerification ? 'flipped' : ''}`}>
                                        <div className="card1-front">
                                        <div className="center1-wrap">
                                                <div className="section1 text-center">
                                                    <h4 className="h41 mb-4 pb-3">Verify Code</h4>
                                                    <form onSubmit={handleVerification}>
                                                        <div className="form1-group">
                                                            <input
                                                                type="text"
                                                                name="verificationCode"
                                                                className="form1-style"
                                                                placeholder="Enter Verification Code"
                                                                id="verificationCode"
                                                                autoComplete="off"
                                                                value={verificationCode}
                                                                onChange={(e) => setVerificationCode(e.target.value)}
                                                            />
                                                            <i className="input1-icon uil uil-check-circle"></i>
                                                        </div>
                                                        {verificationError && <p className="text-danger">{verificationError}</p>}
                                                        <button type="submit" className="a1 btn1 mt-4">Verify</button>
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
export default Verify;
