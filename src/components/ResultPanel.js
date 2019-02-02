import React from 'react';
import SwitchViewContainer from '../containers/SwitchViewContainer';
import EventsPanelContainer from '../containers/EventsPanelContainer';
import PalsPanelContainer from '../containers/PalsPanelContainer';
import viewFilter from '../actions/viewFilter';

const ResultPanel = ({ activeView }) => (
  <div className="justify-content-center">
    <SwitchViewContainer />
    {activeView === viewFilter.SHOW_EVENTS && <EventsPanelContainer />}
    {activeView === viewFilter.SHOW_PALS && <PalsPanelContainer />}
  </div>
);

export default ResultPanel;
