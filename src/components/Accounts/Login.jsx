import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginFields } from "../../constants/formFields";
import Input from "../Form/Input";
import Button from '../Form/Button';

export default function Login() {
    let fieldsState = {};
    loginFields.forEach(field => fieldsState[field.id] = '');

    const { login } = useContext(AuthContext);
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

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const { email, password } = fieldState;
        console.log(email, password)

        // Perform client-side validation
        const validationErrors = {};
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

        // If there are validation errors, set the state
        setErrors(validationErrors);
        setResponse({});

        // If there are no validation errors, proceed with login
        if (Object.keys(validationErrors).length === 0) {
            setResponse(await login({ email, password }));
        }
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    loginFields.map(field => (
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
            <div className="flex items-center justify-between ">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                        Forgot your password?
                    </a>
                </div>
            </div>
            {response && response.status !== undefined && response.message && (
                <span className="fill-current h-6 w-6 text-orange-500">{response.message}</span>
            )}
            <p className='flex items-center justify-center'>
                <Button text='Login' type='submit' onClick={handleSubmit} className={"bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"} />
            </p>
        </form>
    )
}