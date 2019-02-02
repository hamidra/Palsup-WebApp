import React from 'react';
import viewFilter from '../actions/viewFilter';

const SwitchPanel = ({ activeView, handleViewSwitch }) => (
  <ul className="nav nav-tabs justify-content-center">
    <li className="nav-item">
      <a
        className={`nav-link ${
          activeView === viewFilter.SHOW_EVENTS ? 'active' : ''
        }`}
        onClick={() => handleViewSwitch(viewFilter.SHOW_EVENTS)}
        href="#">
        Events
      </a>
    </li>
    <li className="nav-item">
      <a
        className={`nav-link ${
          activeView === viewFilter.SHOW_PALS ? 'active' : ''
        }`}
        onClick={() => handleViewSwitch(viewFilter.SHOW_PALS)}
        href="#">
        Pals
      </a>
    </li>
  </ul>
);

export default SwitchPanel;
