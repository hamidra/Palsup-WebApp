import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import * as activity from '../../redux/dux/activity';
import * as activityEvents from '../../redux/dux/activityEvents';
import * as activityPals from '../../redux/dux/activityPals';
import * as userPals from '../../redux/dux/userPals';

const mapStateToProps = state => ({
  inputValue: state.activity && state.activity.name ? state.activity.name : ''
});

const mapDispatchToProps = dispatch => ({
  handleInputChange: value =>
    dispatch(activity.actions.activityChanged({ name: value })),
  handleButtonClick: () => {
    dispatch(userPals.asyncActions.createPal());
    dispatch(activityEvents.asyncActions.fetchEvents());
    dispatch(activityPals.asyncActions.fetchPals());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
