import React, { useState } from 'react';
import { UserMenu } from './UserMenu.jsx';
import { useAppContext } from '../../context/AppContext.jsx';
import './Navbar.css'

function Navbar() {
    const [mode, setMode] = useState('light');
    const [showMenu, setShowMenu] = useState(false);
    const { loggedIn, handleLogout, toggleAccountModal } = useAppContext(); // Use handleLoginModalOpen instead of toogleLoginModal

    const currentUser = {
        userId: 123,
        name: "Abhay raj",
        email: "abhay@123"
    }

    const changeMode = () => {
        if (mode === 'light') {
            setMode('dark');
        } else {
            setMode('light');
        }
    };

    const handleUserMenu = () => {
        setShowMenu((showMenu) => !showMenu);
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
                        <button className="sqr_btn btn btn_margin">Create</button>
                        <button className="profile_btn" onClick={handleUserMenu} onBlur={() => setShowMenu(false)}>
                            <img src="" alt="" />
                        </button>
                        <UserMenu
                            showMenu={showMenu}
                            handleLogout={handleLogout}
                            currentUser={currentUser}
                        />
                    </>
                ) : (
                    <>
                        <button className="btn btn_margin" onClick={changeMode}><img src={`/icons/${mode}.png`} className='icon' /></button>
                        <button className="sqr_btn btn" onClick={toggleAccountModal}>Sign in</button>
                    </>
                )}
            </div>
        </nav >
    )
}

export default Navbar