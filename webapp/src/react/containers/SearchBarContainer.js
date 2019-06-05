import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import * as activity from '../../redux/dux/activity';
import * as dux from '../../redux/dux/index';

const mapStateToProps = state => ({
  inputValue: state.activity && state.activity.name ? state.activity.name : ''
});

const mapDispatchToProps = dispatch => ({
  handleInputChange: value =>
    dispatch(activity.actions.activityChanged({ name: value })),
  handleButtonClick: async () => {
    dispatch(dux.asyncActions.createPal());
    dispatch(dux.asyncActions.fetchActivityEvents());
    dispatch(dux.asyncActions.fetchActivityPals());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
