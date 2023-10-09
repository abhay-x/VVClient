import { useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { signupFields } from "../../constants/formFields"
import Input from "../Form/Input";
import Button from '../Form/Button';

export default function Signup() {
    let fieldsState = {};
    signupFields.forEach(field => fieldsState[field.id] = '');

    const { register } = useContext(AuthContext);
    const [fieldState, setfieldState] = useState(fieldsState);
    const [errors, setErrors] = useState({});
    const handleChange = (event) => setfieldState({ ...fieldState, [event.target.id]: event.target.value });
    const [response, setResponse] = useState({});

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = fieldState;
        console.log(name, email, password);

        const validationErrors = {};
        if (!name) {
            validationErrors.name = 'Name is required';
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

        // If there are validation errors, set the state
        setErrors(validationErrors);
        setResponse({});

        // If there are no validation errors, proceed with registration
        if (Object.keys(validationErrors).length === 0) {
            setResponse(await register({ name, email, password }));
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    signupFields.map(field => (
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
                {response && response.status !== undefined && response.message && (
                    <span className="fill-current h-6 w-6 text-orange-500">{response.message}</span>
                )}
            </div>
            <p className='flex items-center justify-center'>
                <Button text='Signup' type='submit' onClick={handleSubmit} className={"bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"} />
            </p>
        </form>
    )
}