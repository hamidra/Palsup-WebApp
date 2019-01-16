import React from 'react';
import SwitchTab from './SwitchTab';
import EventsPanel from './EventsPanel';
import PalsPanel from './PalsPanel';
import Events from '../mocks/MockEvents';
import Pals from '../mocks/MockPals';

const ResultPanel = () => {
    var events = Events();
    var pals = Pals();
    return (
        <div className="justify-content-center">
            <SwitchTab/>
            <EventsPanel events={events}/>
            <PalsPanel pals={pals}/>
        </div>
    );
};

export default ResultPanel;