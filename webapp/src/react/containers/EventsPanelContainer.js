import { connect } from 'react-redux';
import EventsPanel from '../components/EventsPanel';
import * as dux from '../../redux/dux/index';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  events:
    state.activityEvents && state.activityEvents.items
      ? state.activityEvents.items
      : {}
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleLikeClick: (eventId, liked) => {
    if (ownProps.isAuthenticated) {
      dispatch(dux.asyncActions.toggleLikeEvent(eventId, liked));
    } else {
      ownProps.history.push('/signin');
    }
  }
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventsPanel)
);
