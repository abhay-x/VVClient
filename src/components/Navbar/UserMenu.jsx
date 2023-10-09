import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import Dropdown from '../Form/Dropdown';

export const UserMenu = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className="profile_btn" onClick={() => setIsOpen(!isOpen)} >
                <img src="" alt="" />
            </button>
            <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="w-full px-4 py-2 text-gray-800">
                    <div>{user && user.name}</div>
                    <small className='u-name-id'>
                        {user.username && user.username}
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
                <button onClick={logout} className="w-full block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Signout
                </button>
            </Dropdown>
        </>
    );
};
