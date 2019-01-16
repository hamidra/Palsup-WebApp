import React from 'react';

const NavBar = () => (
    <nav className="navbar sticky-top navbar-expand-sm navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#myNavbar">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="navbar-nav mr-auto mt-2 mt-sm-0">
                <li className="nav-item d-sm-none">
                    <a className="nav-link" href="#">Profile</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Message</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Notifications</a>
                </li>
                <li className="nav-item d-sm-none">
                    <a className="nav-link" href="#">Login</a>
                </li>
            </ul>
            <a className="nav-link d-none d-sm-inline-block" href="#">User</a>
        </div>
    </nav>
);

export default NavBar;