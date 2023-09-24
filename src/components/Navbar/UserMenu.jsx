import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Dropdown from '../Form/Dropdown';

export const UserMenu = () => {
    const { user1, setLoginState } = useAppContext();
    const user = {
        userId: 123,
        name: "Abhay raj",
        email: "abhay@123"
    };
    // loginState && setUser(currentUser);

    const handleLogout = async () => {
        try {
            // Make a POST request to the server logout endpoint
            const response = await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include', // Include credentials (eg. cookies) for the request
            });
            console.log("logging out!!")

            if (response.ok) {
                // after Logout was successful
                // can now update the client-side state to reflect the user's logged-out status
                localStorage.removeItem('accessToken');
                setLoginState(false);
            } else {
                console.error('Logout failed!');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <>
            <button className="profile_btn" onClick={toggleDropdown} >
                <img src="" alt="" />
            </button>
            <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="w-full px-4 py-2 text-gray-800">
                    <div>{user && user.name}</div>
                    <small className='u-name-id'>
                        {user.email && user.email.split('.')[0]}
                    </small>
                </div>
                <hr />
                <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Edit Profile
                </button>
                <hr />
                <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Create Post
                </button>
                <hr />
                <button onClick={handleLogout} className="w-full block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Signout
                </button>
            </Dropdown>
        </>
    );
};
