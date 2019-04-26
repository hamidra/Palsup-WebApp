import React from 'react';
import * as types from '../../redux/types';

const SwitchPanel = ({ activeView, handleViewSwitch }) => (
  <ul className="nav nav-tabs justify-content-center">
    <li className="nav-item">
      <button
        className={`plain nav-link ${
          activeView === types.viewFilter.SHOW_PALS ? 'active' : ''
        }`}
        onClick={() => handleViewSwitch(types.viewFilter.SHOW_PALS)}>
        Pals
      </button>
    </li>
    <li className="nav-item">
      <button
        className={`plain nav-link ${
          activeView === types.viewFilter.SHOW_EVENTS ? 'active' : ''
        }`}
        onClick={() => handleViewSwitch(types.viewFilter.SHOW_EVENTS)}>
        Events
      </button>
    </li>
  </ul>
);

export default SwitchPanel;
