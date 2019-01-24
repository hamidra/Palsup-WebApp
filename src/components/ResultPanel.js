import React from 'react';
import SwitchTab from './SwitchTab';
import EventsPanelContainer from '../containers/EventsPanelContainer';
import PalsPanel from './PalsPanel';
import Pals from '../mocks/MockPals';

const ResultPanel = () => {
  var pals = Pals();
  return (
    <div className="justify-content-center">
      <SwitchTab />
      <EventsPanelContainer />
      <PalsPanel pals={pals} />
    </div>
  );
};

export default ResultPanel;
