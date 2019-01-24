import { connect } from 'react-redux';
import ResultPanel from '../components/ResultPanel';

const mapStateToProps = state => ({
  activeView: state.filters ? state.filters.viewFilter : ''
});

export default connect(mapStateToProps)(ResultPanel);
