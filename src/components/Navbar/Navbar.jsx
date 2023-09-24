import React, { useState } from 'react';
import { UserMenu } from './UserMenu.jsx';
import { useAppContext } from '../../context/AppContext.jsx';
import './Navbar.css'

function Navbar() {
    const { loginState, toggleAccountModal } = useAppContext();
    const [mode, setMode] = useState('light');
    const changeMode = () => setMode(mode === 'light' ? 'dark' : 'light');
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
                {loginState ? (
                    <>
                        <button className="sqr_btn btn btn_margin">Create</button>
                        <UserMenu />
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