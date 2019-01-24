import { connect } from 'react-redux';
import PalsPanel from '../components/PalsPanel';
// need to add like actions

const mapStateToProps = state => ({
  pals: state.pals && state.pals.items ? state.pals.items : []
});

export default connect(mapStateToProps)(PalsPanel);
