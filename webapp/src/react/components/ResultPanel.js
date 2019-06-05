import React from 'react';
import SwitchViewContainer from '../containers/SwitchViewContainer';
import EventsPanelContainer from '../containers/EventsPanelContainer';
import PalsPanelContainer from '../containers/PalsPanelContainer';
import * as types from '../../redux/enums';

const ResultPanel = ({ activeView, isAuthenticated }) => (
  <div className="justify-content-center">
    <SwitchViewContainer />
    {activeView === types.viewFilter.SHOW_EVENTS && (
      <EventsPanelContainer isAuthenticated={isAuthenticated} />
    )}
    {activeView === types.viewFilter.SHOW_PALS && (
      <PalsPanelContainer isAuthenticated={isAuthenticated} />
    )}
  </div>
);

export default ResultPanel;
