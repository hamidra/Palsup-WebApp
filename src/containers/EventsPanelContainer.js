import { connect } from 'react-redux';
import EventsPanel from '../components/EventsPanel';
// need to add like actions

const mapStateToProps = state => ({
  events: state.events && state.events.items ? state.events.items : []
});

export default connect(mapStateToProps)(EventsPanel);
