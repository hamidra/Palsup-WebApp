import { connect } from 'react-redux';
import SwitchView from '../components/SwitchView';
import * as filter from '../../redux/dux/filter';

const mapStateToProps = state => ({
  activeView: state.filter ? state.filter.viewFilter : ''
});
const mapDispatchToProps = dispatch => ({
  handleViewSwitch: viewFilter =>
    dispatch(filter.actions.viewFilterChanged(viewFilter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitchView);
