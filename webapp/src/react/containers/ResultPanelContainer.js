import { connect } from 'react-redux';
import ResultPanel from '../components/ResultPanel';

const mapStateToProps = state => ({
  activeView: state.filter ? state.filter.viewFilter : ''
});

export default connect(mapStateToProps)(ResultPanel);
