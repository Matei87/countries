import React from 'react';
import './Header.css';

const Header = (props) => {
    return (
        <header className={props.theme === 'light' ? 'light' : 'dark'} >
            <div className="container-fluid">
                <h2>Where in the world?</h2>
                <button className="btn btn-outline-primary" onClick={props.toggleTheme} >{props.theme === 'light' ? <>
                    <i className="fas fa-moon" /> <span>Dark</span></> : <>
                        <i className="fas fa-sun" style={{ color: 'gold' }} /> <span style={{ color: 'gold' }}>Light</span></>}</button>
            </div>
        </header>
    )
}

export default Header;
