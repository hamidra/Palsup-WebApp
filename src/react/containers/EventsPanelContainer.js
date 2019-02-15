import { connect } from 'react-redux';
import EventsPanel from '../components/EventsPanel';
// need to add like actions

const mapStateToProps = state => ({
  events:
    state.activityEvents && state.activityEvents.items
      ? state.activityEvents.items
      : []
});

export default connect(mapStateToProps)(EventsPanel);
