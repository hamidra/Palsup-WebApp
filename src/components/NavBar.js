import React from 'react';

const NavBar = () => (
    <nav class="navbar sticky-top navbar-expand-sm navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#myNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="navbar-nav mr-auto mt-2 mt-sm-0">
                <li class="nav-item d-sm-none">
                    <a class="nav-link" href="#">Profile</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Message</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Notifications</a>
                </li>
                <li class="nav-item d-sm-none">
                    <a class="nav-link" href="#">Login</a>
                </li>
            </ul>
            <a class="nav-link d-none d-sm-inline-block" href="#">User</a>
        </div>
    </nav>
);

export default NavBar;