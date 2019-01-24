import { connect } from 'react-redux';
import SwitchView from '../components/SwitchView';
import {
  viewFilterChanged
} from '../actions/activitySearchActions';

const mapStateToProps = state => ({
  activeView: state.filters ? state.filters.viewFilter : ''
});
const mapDispatchToProps = dispatch => ({
  handleViewSwitch: viewFilter => dispatch(viewFilterChanged(viewFilter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitchView);
