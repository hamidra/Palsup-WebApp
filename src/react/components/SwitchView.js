import React from 'react';
import * as types from '../../redux/types';

const SwitchPanel = ({ activeView, handleViewSwitch }) => (
  <ul className="nav nav-tabs justify-content-center">
    <li className="nav-item">
      <a
        className={`nav-link ${
          activeView === types.viewFilter.SHOW_PALS ? 'active' : ''
        }`}
        onClick={() => handleViewSwitch(types.viewFilter.SHOW_PALS)}
        href="#">
        Pals
      </a>
    </li>
    <li className="nav-item">
      <a
        className={`nav-link ${
          activeView === types.viewFilter.SHOW_EVENTS ? 'active' : ''
        }`}
        onClick={() => handleViewSwitch(types.viewFilter.SHOW_EVENTS)}
        href="#">
        Events
      </a>
    </li>
  </ul>
);

export default SwitchPanel;
