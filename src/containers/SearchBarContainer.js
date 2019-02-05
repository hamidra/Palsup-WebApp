import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { activityChange } from '../actions/activitySearchActions';
import { fetchEventsAsync } from '../actions/asyncFetchEvents';
import { fetchPalsAsync } from '../actions/asyncFetchPals';

const mapStateToProps = state => ({
  inputValue: state.activity && state.activity.name ? state.activity.name : ''
});

const mapDispatchToProps = dispatch => ({
  handleInputChange: event =>
    dispatch(activityChange({ name: event.target.value })),
  handleButtonClick: () => {
    dispatch(fetchEventsAsync());
    dispatch(fetchPalsAsync());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
