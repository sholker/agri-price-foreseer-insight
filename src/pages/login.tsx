"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');

        const handleSignUpClick = () => setIsRightPanelActive(true);
        const handleSignInClick = () => setIsRightPanelActive(false);

        if (signUpButton) {
            signUpButton.addEventListener('click', handleSignUpClick);
        }
        if (signInButton) {
            signInButton.addEventListener('click', handleSignInClick);
        }

        // Cleanup event listeners on component unmount
        return () => {
            if (signUpButton) {
                signUpButton.removeEventListener('click', handleSignUpClick);
            }
            if (signInButton) {
                signInButton.removeEventListener('click', handleSignInClick);
            }
        };
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(username, password)) {
            toast.success('Login successful!');
            navigate('/');
        } else {
            toast.error('Invalid credentials');
        }
    };

    return (
        <>
            <style>{`
                :root {
                    /* COLORS */
                    --white: #e9e9e9;
                    --grey: #333;
                    --green: #087654;
                    --lightblue: #008997;

                    /* RADII */
                    --button-radius: 0.7rem;

                    /* SIZES */
                    --max-width: 758px;
                    --max-height: 420px;

                    font-size: 16px;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
                        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
                }

                .form__title {
                    font-weight: 300;
                    margin: 0;
                    margin-bottom: 1.25rem;
                }

                .link {
                    color: var(--grey);
                    font-size: 0.9rem;
                    margin: 1.5rem 0;
                    text-decoration: none;
                }

                .container {
                    background-color:var(--white);
                    border-radius: var(--button-radius);
                    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
                        0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
                    height: var(--max-height);
                    max-width: var(--max-width);
                    overflow: hidden;
                    position: relative;
                    width: 100%;
                }

                .container__form {
                    height: 100%;
                    position: absolute;
                    top: 0;
                    transition: all 0.6s ease-in-out;
                }

                .container--signin {
                    left: 0;
                    width: 50%;
                    z-index: 2;
                }

                .container.right-panel-active .container--signin {
                    transform: translateX(100%);
                }

                .container--signup {
                    left: 0;
                    opacity: 0;
                    width: 50%;
                    z-index: 1;
                }

                .container.right-panel-active .container--signup {
                    animation: show 0.6s;
                    opacity: 1;
                    transform: translateX(100%);
                    z-index: 5;
                }

                .container__overlay {
                    height: 100%;
                    left: 50%;
                    overflow: hidden;
                    position: absolute;
                    top: 0;
                    transition: transform 0.6s ease-in-out;
                    width: 50%;
                    z-index: 100;
                }

                .container.right-panel-active .container__overlay {
                    transform: translateX(-100%);
                }

                .overlay {
                    background: linear-gradient(#114232, #243b55);
                    height: 100%;
                    left: -100%;
                    position: relative;
                    transform: translateX(0);
                    transition: transform 0.6s ease-in-out;
                    width: 200%;
                }

                .container.right-panel-active .overlay {
                    transform: translateX(50%);
                }

                .overlay__panel {
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    justify-content: center;
                    position: absolute;
                    text-align: center;
                    top: 0;
                    transform: translateX(0);
                    transition: transform 0.6s ease-in-out;
                    width: 50%;
                }

                .overlay--left {
                    transform: translateX(-20%);
                }

                .container.right-panel-active .overlay--left {
                    transform: translateX(0);
                }

                .overlay--right {
                    right: 0;
                    transform: translateX(0);
                }

                .container.right-panel-active .overlay--right {
                    transform: translateX(20%);
                }

                .btn {
                    background-color: var(--green);
                    background-image: linear-gradient(90deg, var(--green) 0%, var(--green) 74%);
                    border-radius: 20px;
                    border: 1px solid var(--green);
                    color: var(--white);
                    cursor: pointer;
                    font-size: 0.8rem;
                    font-weight: bold;
                    letter-spacing: 0.1rem;
                    padding: 0.9rem 4rem;
                    text-transform: uppercase;
                    transition: transform 80ms ease-in;
                }

                .form > .btn {
                    margin-top: 1.5rem;
                }

                .btn:active {
                    transform: scale(0.95);
                }

                .btn:focus {
                    outline: none;
                }

                .form {
                    background-color: var(--white);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    padding: 0 3rem;
                    height: 100%;
                    text-align: center;
                }

                .input {
                    background-color: #fff;
                    border: none;
                    padding: 0.9rem 0.9rem;
                    margin: 0.5rem 0;
                    width: 100%;
                }

                @keyframes show {
                    0%,
                    49.99% {
                        opacity: 0;
                        z-index: 1;
                    }

                    50%,
                    100% {
                        opacity: 1;
                        z-index: 5;
                    }
                }
            `}</style>
            <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
                {/* Sign Up */}
                <div className="container__form container--signup">
                    <form className="form" id="form1" onSubmit={handleFormSubmit}>
                        <h2 className="form__title">Sign Up</h2>
                        <input type="text" placeholder="Username" className="input" />
                        <input type="email" placeholder="Email" className="input" />
                        <input type="password" placeholder="Password" className="input" />
                        <button className="btn">Sign Up</button>
                    </form>
                </div>

                {/* Sign In */}
                <div className="container__form container--signin">
                    <form className="form" id="form2" onSubmit={handleFormSubmit}>
                        <h2 className="form__title">Sign In</h2>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="input" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <a href="#" className="link">Forgot your password?</a>
                        <button className="btn">Sign In</button>
                    </form>
                </div>

                {/* Overlay */}
                <div className="container__overlay">
                    <div className="overlay">
                        <div className="overlay__panel overlay--left">
                            <button className="btn" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay__panel overlay--right">
                            <button className="btn" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;