import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal.jsx';
// import './AccountModal.css'
import { useAppContext } from '../../context/AppContext.jsx';

const LoginForm = ({ handleLogin, handleToggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Perform client-side validation
        const validationErrors = {};
        if (!email) {
            validationErrors.email = 'Email is required';
        }
        if (!password) {
            validationErrors.password = 'Password is required';
        }

        // If there are validation errors, set the state and return
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // If there are no validation errors, proceed with login
        handleLogin({ email, password });
    };

    return (
        <>
            <h2>Sign in</h2>
            <form id="account" onSubmit={handleSubmit}>
                <div className="input-group">
                    <div className="input-field">
                        <i className="fa-solid fa-envelope"></i>
                        <input name="email" type="email" placeholder="Email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="input-field">
                        <i className="fa-solid fa-lock"></i>
                        <input name="password" type="password" placeholder="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <p>
                        <a href="#" onClick={handleToggleForm}>
                            New User? Click Here!
                        </a>
                    </p>
                </div>
                <button type="submit" id="signinBtn">
                    Login
                </button>
            </form>
        </>
    );
};

const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isPasswordValid = (password) => {
    // Define your password complexity requirements here
    const minLength = 8;
    const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\]/.test(password);

    return password.length >= minLength && hasSpecialCharacter;
};

const RegisterForm = ({ handleRegister, handleToggleForm }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    // useEffect to handle the event when any of the fields change
    useEffect(() => {
        // Trim whitespaces for all fields before updating the state variables
        setFirstName((prevFirstName) => prevFirstName.replace(/\s/g, ''));
        setLastName((prevLastName) => prevLastName.replace(/\s/g, ''));
        setEmail((prevEmail) => prevEmail.replace(/\s/g, ''));
    }, [firstName, lastName, email]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = {};
        if (!firstName) {
            validationErrors.firstName = 'First name is required';
        }
        if (!lastName) {
            validationErrors.lastName = 'Last name is required';
        }
        if (!email) {
            validationErrors.email = 'Email is required';
        } else if (!isEmailValid(email)) {
            validationErrors.email = 'Please enter a valid email !';
        }
        if (!password) {
            validationErrors.password = 'Password is required';
        } else if (!isPasswordValid(password)) {
            validationErrors.password = 'Password must be at least 8 characters long and contain at least one special character.';
        }

        // If there are validation errors, set the state and return
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // If there are no validation errors, proceed with registration
        handleRegister({ firstName, lastName, email, password });
    };

    return (
        <>
            <h2>Register</h2>
            <form id="account" onSubmit={handleSubmit}>
                <div className="input-group">
                    <div className="input-field">
                        <i className="fa-solid fa-user"></i>
                        <input name="firstName" type="text" placeholder="First name"
                            value={firstName} onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                        <input name="lastName" type="text" placeholder="Last name"
                            value={lastName} onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>
                    <div className="input-field">
                        <i className="fa-solid fa-envelope"></i>
                        <input
                            name="email" type="email" placeholder="Email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="input-field">
                        <i className="fa-solid fa-lock"></i>
                        <input
                            name="password" type="password" placeholder="Password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <p>
                        <a href="#" onClick={handleToggleForm}>
                            Already have an account? Click Here!
                        </a>
                    </p>
                </div>
                <button type="submit" id="signupBtn">
                    Register
                </button>
            </form>
        </>
    );
};


const AccountModal = () => {
    const { handleLogin, handleRegister, showAccountModal, toggleAccountModal } = useAppContext();
    const [showLoginFields, setShowLoginFields] = useState(true);
    const handleToggleForm = () => {
        setShowLoginFields(!showLoginFields);
    };

    return (
        <Modal className="account_modal" isOpen={showAccountModal} onRequestClose={toggleAccountModal}>
            {showLoginFields ? (
                <LoginForm handleLogin={handleLogin} handleToggleForm={handleToggleForm} />
            ) : (
                <RegisterForm handleRegister={handleRegister} handleToggleForm={handleToggleForm} />
            )}
        </Modal>
    );
}

export default AccountModal;