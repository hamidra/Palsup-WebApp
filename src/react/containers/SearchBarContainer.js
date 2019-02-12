import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import * as activity from '../../redux/dux/activity';
import * as events from '../../redux/dux/events';
import * as pals from '../../redux/dux/pals';

const mapStateToProps = state => ({
  inputValue: state.activity && state.activity.name ? state.activity.name : ''
});

const mapDispatchToProps = dispatch => ({
  handleInputChange: event =>
    dispatch(activity.actions.activityChange({ name: event.target.value })),
  handleButtonClick: () => {
    dispatch(events.asyncActions.fetchEvents());
    dispatch(pals.asyncActions.fetchPals());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
