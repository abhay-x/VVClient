import { useState } from 'react';
import { useAppContext } from "../../context/AppContext";
import { signupFields } from "../../constants/formFields"
import Input from "../Form/Input";
import Button from '../Form/Button';

const fields = signupFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
    const { apiUrl, setLoginState } = useAppContext();
    const [fieldState, setfieldState] = useState(fieldsState);
    const [errors, setErrors] = useState({});
    const handleChange = (event) => setfieldState({ ...fieldState, [event.target.id]: event.target.value });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = fieldState;
        console.log(username, email, password);

        const validationErrors = {};
        if (!username) {
            validationErrors.username = 'Username is required';
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
        } else if (password != confirmPassword) {
            validationErrors.confirmPassword = "Password didn't match!!";
        }

        // If there are validation errors, set the state and return
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // If there are no validation errors, proceed with registration
        createAccount({ firstName, lastName, email, password });
    }

    //handle Signup API Integration here
    const createAccount = async (userData) => {
        try {
            // API call to backend server to handle registration to /register endpoint.
            const response = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                setLoginState(true);
                // after successful registration hv to perform the necessary actions like redirect, display success message.
                console.log('Registration successful!');
            } else {
                console.error('Registration failed!');
            }
        } catch (error) {
            // errors that occurred during the API call
            console.error('An error occurred during registration:', error);
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field => (
                        <div key={field.id}>
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={fieldState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                            />
                            {errors[field.id] && <span className="fill-current h-6 w-6 text-orange-500">{errors[field.id]}</span>}
                        </div>
                    ))
                }
            </div>
            <p className='flex items-center justify-center'>
                <Button text='Signup' type='submit' onClick={handleSubmit} className={"bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"} />
            </p>
        </form>
    )
}