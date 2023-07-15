import React, { useState } from 'react';
import './Navbar.css'

function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [mode, setMode] = useState('light');

    const handleLogin = () => {
        setLoggedIn(true);
        // Perform login logic here
    };

    const handleLogout = () => {
        setLoggedIn(false);
        // Perform logout logic here
    };

    const changeMode = () => {
        if (mode === 'light') {
            setMode('dark');
        } else {
            setMode('light');
        }
    };

    const toggleMenu = () => { };

    return (
        <nav className='navbar flex'>
            <div className="nav_left flex">

                <button className="btn btn_margin" onClick={toggleMenu}><img src='/icons/hamburger.png' className='icon' /></button>
                <a href="/"><img src="" alt="Vigilante Vibes" /></a>
            </div>

            <div className="nav_middle flex">
                <input className='search_bar' type="text" placeholder="Search" />
                <button className='search_button'><i className="fa-solid fa-magnifying-glass fa-lg"></i></button>
            </div>

            <div className='nav_right flex'>
                {loggedIn ? (
                    <>
                        <button className="sqr_btn btn btn_margin">
                            Create
                        </button>
                        <button className="profile_btn">
                            <img src="" alt="" />
                        </button>
                    </>
                ) : (
                    <>
                        <button className="btn btn_margin" onClick={changeMode}><img src={'/icons/' + mode + '.png'} className='icon' /></button>
                        <button className="sqr_btn btn" onClick={handleLogin}>Sign in</button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar