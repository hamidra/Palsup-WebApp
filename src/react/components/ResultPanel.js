import React from 'react';
import SwitchViewContainer from '../containers/SwitchViewContainer';
import EventsPanelContainer from '../containers/EventsPanelContainer';
import PalsPanelContainer from '../containers/PalsPanelContainer';
import * as types from '../../redux/types';

const ResultPanel = ({ activeView }) => (
  <div className="justify-content-center">
    <SwitchViewContainer />
    {activeView === types.viewFilter.SHOW_EVENTS && <EventsPanelContainer />}
    {activeView === types.viewFilter.SHOW_PALS && <PalsPanelContainer />}
  </div>
);

export default ResultPanel;
