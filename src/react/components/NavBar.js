import React from 'react';

const NavBar = () => (
  <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white">
    <a className="navbar-brand" href="/">
      Palz
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#myNavbar">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="myNavbar">
      <ul className="navbar-nav mr-auto mt-2 mt-sm-0">
        <li className="nav-item d-sm-none">
          <a className="nav-link" href="#">
            Profile
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/events">
            Events
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/pals">
            Activities
          </a>
        </li>
        <li className="nav-item d-sm-none">
          <a className="nav-link" href="#">
            Login
          </a>
        </li>
      </ul>
      <a className="nav-link d-none d-sm-inline-block" href="#">
        SignUp/User
      </a>
    </div>
  </nav>
);

export default NavBar;
