import { connect } from 'react-redux';
import EventsPanel from '../components/EventsPanel';
import * as dux from '../../redux/dux/index';
// need to add like actions

const mapStateToProps = state => ({
  events:
    state.activityEvents && state.activityEvents.items
      ? state.activityEvents.items
      : {}
});

const mapDispatchToProps = dispatch => ({
  handleLikeClick: (eventId, liked) =>
    dispatch(dux.asyncActions.toggleLikeEvent(eventId, liked))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsPanel);
