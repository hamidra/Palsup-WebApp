import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import {
  activityChange,
  fetchEventsAsync
} from '../actions/activitySearchActions';

const mapStateToProps = state => ({
  inputValue: state.activity && state.activity.name ? state.activity.name : ''
});

const mapDispatchToProps = dispatch => ({
  handleInputChange: event =>
    dispatch(activityChange({ name: event.target.value })),
  handleButtonClick: () => dispatch(fetchEventsAsync())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
